
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NavItem, Language, SocialLink } from '../../types';
import { APP_LOGO_URL, SIDEBAR_TOP_ITEMS, SIDEBAR_BOTTOM_ITEMS, SOCIAL_LINKS, LANGUAGES } from '../../constants';
import { ChevronDownIcon } from '../icons/ChevronDownIcon';

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
        <span className="text-sm uppercase">{item.label}</span> {/* Added uppercase class */}
      </Link>
    );
  };

  return (
    <>
      {/* Sidebar for larger screens */}
      <aside className="hidden md:flex md:flex-col w-64 bg-dark-bg text-text-light space-y-4 p-4 shadow-lg fixed h-full z-50">
        <div className="flex items-center justify-center py-2 border-b border-gray-700">
          <img src={APP_LOGO_URL} alt="App Logo" className="h-10 object-contain" />
        </div>

        <div className="flex items-center justify-start py-2 border-b border-gray-700 px-2">
          <span className="text-sm text-gray-400 mr-2">Language:</span>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.id}
              onClick={() => setCurrentLanguage(lang.id)}
              className={`px-3 py-1 text-xs rounded-md transition-colors duration-200 ml-1
                          ${currentLanguage === lang.id ? 'bg-primary text-white font-semibold' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              {lang.label}
            </button>
          ))}
        </div>

        <nav className="flex-grow space-y-1.5 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          {SIDEBAR_TOP_ITEMS.map((item) => (
            <NavLinkItem key={item.id} item={item} />
          ))}
        </nav>

        <div className="border-t border-gray-700 pt-4 space-y-2">
          {SIDEBAR_BOTTOM_ITEMS.map((item) => (
            <NavLinkItem key={item.id} item={item} />
          ))}
          <div className="flex justify-center space-x-4 pt-2">
            {SOCIAL_LINKS.map((link: SocialLink) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-primary transition-colors duration-200"
                aria-label={link.label}
              >
                <link.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>
      </aside>
      {/* Spacer for fixed sidebar on desktop */}
      <div className="hidden md:block w-64 flex-shrink-0"></div>


      {/* Mobile Sidebar (Drawer) */}
      <div className={`fixed inset-0 z-50 transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
                      transition-transform duration-300 ease-in-out md:hidden`}>
        <aside className="flex flex-col w-64 bg-dark-bg text-text-light space-y-4 p-4 shadow-lg h-full">
          <div className="flex items-center justify-between py-2 border-b border-gray-700">
            <img src={APP_LOGO_URL} alt="App Logo" className="h-10 object-contain" />
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white p-1">
               <ChevronDownIcon className="h-6 w-6 transform rotate-90" /> {/* Using Chevron as close */}
            </button>
          </div>

          <div className="flex items-center justify-start py-2 border-b border-gray-700 px-2">
            <span className="text-sm text-gray-400 mr-2">Language:</span>
            {LANGUAGES.map((lang) => (
              <button
                key={lang.id}
                onClick={() => { setCurrentLanguage(lang.id); /* setIsOpen(false); */ }}
                className={`px-3 py-1 text-xs rounded-md transition-colors duration-200 ml-1
                            ${currentLanguage === lang.id ? 'bg-primary text-white font-semibold' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <nav className="flex-grow space-y-1.5 overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
            {SIDEBAR_TOP_ITEMS.map((item) => (
              <NavLinkItem key={item.id} item={item} />
            ))}
          </nav>

          <div className="border-t border-gray-700 pt-4 space-y-2">
            {SIDEBAR_BOTTOM_ITEMS.map((item) => (
              <NavLinkItem key={item.id} item={item} />
            ))}
            <div className="flex justify-center space-x-4 pt-2">
              {SOCIAL_LINKS.map((link: SocialLink) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary transition-colors duration-200"
                  aria-label={link.label}
                >
                  <link.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
};
