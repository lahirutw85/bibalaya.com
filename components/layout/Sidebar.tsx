

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavItem, Language } from '../../types'; 
import { 
  APP_LOGO_URL, 
  SIDEBAR_TOP_ITEMS, 
  SIDEBAR_BOTTOM_ITEMS, 
  LANGUAGES,
  YOUTUBE_CHANNEL_URL,
  YOUTUBE_SUBSCRIBER_COUNT
} from '../../constants';
import { YouTubeIcon } from '../icons'; 

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, setIsOpen }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(Language.EN);
  const location = useLocation();

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
    <div className="border-t border-gray-700 pt-4 space-y-3">
      {/* "Your Account" Link Placeholder */}
      {SIDEBAR_BOTTOM_ITEMS.map(item => (
        <div key={item.id} className="flex justify-center">
          <NavLinkItem item={item} />
        </div>
      ))}

      {/* YouTube Subscriber Section */}
      <div className="space-y-1.5 text-gray-300 px-3 text-center"> 
        <div className="flex items-center justify-center space-x-2">
          <YouTubeIcon className="h-5 w-5 text-red-600"/>
          <span className="text-xs font-medium">Subscribers: {YOUTUBE_SUBSCRIBER_COUNT}</span>
        </div>
        <a 
          href={YOUTUBE_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full max-w-xs mx-auto mt-1.5 px-3 py-2 bg-red-600 text-white text-xs font-semibold rounded-md hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75"
        >
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