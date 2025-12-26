
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavItem, Language } from '../../types';
import {
  APP_LOGO_URL,
  SIDEBAR_TOP_ITEMS,
  SIDEBAR_BOTTOM_ITEMS, // Reinstated for placeholder account link
  LANGUAGES,
  YOUTUBE_CHANNEL_URL,
  YOUTUBE_SUBSCRIBER_COUNT,
  SOCIAL_LINKS
} from '../../constants';
import { YouTubeIcon } from '../icons';
import { useUser } from '../../src/contexts/UserContext';
// Removed Clerk-specific icon imports: LoginIcon, UserPlusIcon
// Removed Clerk components: SignedIn, SignedOut, UserButton, SignInButton, SignUpButton

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(Language.EN);
  const location = useLocation();

  // State for subscriber count, initialized with constant
  const [subscriberCount, setSubscriberCount] = useState<string>(YOUTUBE_SUBSCRIBER_COUNT);

  React.useEffect(() => {
    const fetchSubscribers = async () => {
      const apiKey = import.meta.env.VITE_YOUTUBE_API_KEY;
      if (!apiKey) {
        console.warn("Sidebar: No VITE_YOUTUBE_API_KEY found.");
        return;
      }

      console.log("Sidebar: Fetching YouTube stats...");
      try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&forHandle=@lahiruthikshana&key=${apiKey}`);
        console.log("Sidebar: YouTube API status:", response.status);

        if (!response.ok) {
          console.error(`Sidebar: YouTube API failed with status ${response.status}`);
          return;
        }

        const data = await response.json();
        console.log("Sidebar: YouTube API data:", data);

        if (data.items && data.items.length > 0) {
          const count = parseInt(data.items[0].statistics.subscriberCount);
          const formatted = new Intl.NumberFormat('en-US', { notation: "compact", maximumFractionDigits: 2 }).format(count);
          setSubscriberCount(formatted);
        } else {
          console.warn("Sidebar: No channel items found in YouTube response.");
        }
      } catch (error) {
        console.error("Failed to fetch YouTube stats", error);
      }
    };
    fetchSubscribers();
  }, []);

  const { user, profile } = useUser();

  const handleNavItemClick = () => {
    if (window.innerWidth < 768) { // md breakpoint
      setIsOpen(false);
    }
  };

  const NavLinkItem: React.FC<{ item: NavItem }> = ({ item }) => {
    const isActive = location.pathname === item.path;
    return (
      <Link
        to={item.path}
        onClickCapture={(e) => { if (item.disabled) e.preventDefault(); else handleNavItemClick(); }}
        className={`flex items-center space-x-3 p-3 rounded-lg transition-colors duration-200
                    ${isActive ? 'bg-primary text-text-light font-semibold shadow-md' : 'hover:bg-gray-700 text-text-light hover:text-text-light'}
                    ${item.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        aria-disabled={item.disabled}
        tabIndex={item.disabled ? -1 : 0}
      >
        <item.icon className="h-5 w-5 flex-shrink-0" />
        <span className="text-sm uppercase">{item.label}</span>
      </Link>
    );
  };

  const renderBottomSection = () => (
    <div className="space-y-4">
      {/* Account / Bottom Nav */}
      <nav className="space-y-1">
        {SIDEBAR_BOTTOM_ITEMS.map(item => {
          // Check if this is the account item and if we have user data
          if (item.id === 'account' && user && profile) {
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={handleNavItemClick}
                className={`flex items-center px-4 py-2.5 rounded-md transition-all duration-200 group
                            ${location.pathname === item.path
                    ? 'bg-primary text-white shadow-md'
                    : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
              >
                {/* Circle Avatar */}
                <div className="mr-3 h-8 w-8 rounded-full bg-indigo-500 flex items-center justify-center overflow-hidden border border-gray-500 group-hover:border-white transition-colors">
                  {profile.avatarUrl ? (
                    <img src={profile.avatarUrl} alt={profile.username} className="h-full w-full object-cover" />
                  ) : (
                    <span className="font-bold text-xs uppercase">{profile.username.charAt(0) || user.email?.charAt(0)}</span>
                  )}
                </div>
                <span className="font-medium truncate">{profile.username || "My Account"}</span>
              </Link>
            );
          }

          // Default render for other items or if not logged in
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.id}
              to={item.path}
              onClick={handleNavItemClick}
              className={`flex items-center px-4 py-2.5 rounded-md transition-all duration-200 group
                  ${isActive
                  ? 'bg-primary text-white shadow-md'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                }`}
            >
              <Icon className={`w-5 h-5 mr-3 transition-colors duration-200 ${isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'}`} />
              <span className="font-medium">{item.label}</span>
            </Link>
          )
        })}
      </nav>

      {/* Social Links - Only render if there are links */}
      {SOCIAL_LINKS.length > 0 && (
        <div className="border-t border-gray-700 pt-3">
          <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Connect</h3>
          <div className="flex px-3 space-x-3">
            {SOCIAL_LINKS.map(link => {
              const Icon = link.icon;
              return (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white transition-colors p-2"
                  aria-label={link.label}
                >
                  <Icon className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </div>
      )}

      {/* YouTube Subscribe Button */}
      <div className="px-3 pt-2">
        {/* Subscriber Count Display */}
        <div className="flex items-center justify-center space-x-2 mb-2 text-gray-400 text-xs">
          <span className="font-medium">Subscribers: {subscriberCount}</span>
        </div>

        <a
          href={YOUTUBE_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-full items-center justify-center px-3 py-2 bg-red-600 text-white text-xs font-semibold rounded-md hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
        >
          <YouTubeIcon className="w-4 h-4 mr-2" />
          Subscribe on YouTube
        </a>
      </div>
    </div>
  );


  const sidebarContent = (
    <div className="h-full flex flex-col bg-dark-bg text-text-light shadow-2xl">
      {/* Logo */}
      <div className="p-4 border-b border-gray-700">
        <Link to="/" className="block" onClick={handleNavItemClick}>
          <img
            src={APP_LOGO_URL}
            alt="App Logo"
            className="w-full h-auto max-h-16 object-contain"
          />
        </Link>
      </div>

      {/* Language Selector - Buttons */}
      <div className="px-3 py-3 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <span className="text-lg text-gray-400 mr-1 uppercase">Language:</span>
          {LANGUAGES.map(lang => (
            <button
              key={lang.id}
              onClick={() => setCurrentLanguage(lang.id)}
              className={`px-3 py-1 text-xl uppercase font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-75
                          ${currentLanguage === lang.id
                  ? 'bg-primary text-white focus:ring-primary-dark'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 focus:ring-gray-500'
                }`}
            >
              {lang.label}
            </button>
          ))}
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-grow p-3 space-y-1.5 overflow-y-auto scrollbar-hide">
        {SIDEBAR_TOP_ITEMS.map(item => (
          <NavLinkItem key={item.id} item={item} />
        ))}
      </nav>

      {/* Bottom Section (Account, Socials) */}
      <div className="p-3">
        {renderBottomSection()}
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-64 h-screen sticky top-0">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar (Drawer) */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out md:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-sidebar-title"
      >
        {sidebarContent}
      </div>
    </>
  );
};