

import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon, LogoutIcon, SettingsIcon, UsersIcon } from '../../constants';
import DarkModeToggle from '../shared/DarkModeToggle';
import { AdminPage } from '../../types';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  pageTitle: string;
  userName: string;
  onLogout: () => void;
  onToggleSidebar: () => void;
  setActivePage: (page: AdminPage) => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, onToggleDarkMode, pageTitle, userName, onLogout, onToggleSidebar, setActivePage }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleNav = (page: AdminPage) => {
      setActivePage(page);
      setIsProfileOpen(false);
  }

  return (
    <header className="flex-shrink-0 h-16 bg-light-100 dark:bg-dark-800 flex items-center justify-between px-4 sm:px-6 border-b border-light-300 dark:border-dark-700">
      <div className="flex items-center">
        <button 
          onClick={onToggleSidebar} 
          className="md:hidden p-2 -ml-2 mr-2 text-gray-600 dark:text-gray-300 rounded-full hover:bg-light-200 dark:hover:bg-dark-700"
          aria-label="Open sidebar"
        >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
        </button>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{pageTitle}</h1>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <div className="relative hidden sm:block">
          <SearchIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-light-200 dark:bg-dark-700 border border-light-300 dark:border-dark-700 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-800 dark:text-gray-200"
          />
        </div>
        
        <div className="flex items-center space-x-3">
            <DarkModeToggle isDarkMode={isDarkMode} onToggle={onToggleDarkMode} />
            <div className="w-px h-6 bg-light-300 dark:bg-dark-700"></div>
            
            <div className="relative" ref={profileRef}>
                <button onClick={() => setIsProfileOpen(!isProfileOpen)} aria-haspopup="true" aria-expanded={isProfileOpen}>
                    <img src={`https://i.pravatar.cc/150?u=${userName}`} alt="Admin profile" className="w-9 h-9 rounded-full" />
                </button>

                {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-light-100 dark:bg-dark-800 rounded-lg shadow-xl border border-light-300 dark:border-dark-700 z-10" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
                        <div className="p-4 border-b border-light-300 dark:border-dark-700">
                            <div className="flex items-center space-x-3">
                                <img src={`https://i.pravatar.cc/150?u=${userName}`} alt="" className="w-12 h-12 rounded-full" />
                                <div>
                                    <p className="font-semibold text-gray-800 dark:text-gray-200">Admin User</p>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">admin@smartsafar.com</p>
                                </div>
                            </div>
                        </div>
                        <nav className="p-2" role="none">
                            <button onClick={() => handleNav('Profile')} className="flex items-center w-full text-left space-x-3 px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-light-200 dark:hover:bg-dark-700 rounded-md" role="menuitem">
                                <UsersIcon className="w-5 h-5" />
                                <span>My Profile</span>
                            </button>
                            <button onClick={() => handleNav('Settings')} className="flex items-center w-full text-left space-x-3 px-3 py-2 text-sm text-gray-600 dark:text-gray-300 hover:bg-light-200 dark:hover:bg-dark-700 rounded-md" role="menuitem">
                                <SettingsIcon className="w-5 h-5" />
                                <span>Settings</span>
                            </button>
                        </nav>
                        <div className="p-2 border-t border-light-300 dark:border-dark-700">
                             <button onClick={onLogout} className="flex items-center space-x-3 w-full px-3 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-md" role="menuitem">
                                <LogoutIcon className="w-5 h-5" />
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>
    </header>
  );
};

export default Header;