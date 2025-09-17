import React from 'react';
import { SearchIcon } from '../../constants';
import DarkModeToggle from '../shared/DarkModeToggle';

interface HeaderProps {
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, onToggleDarkMode }) => {
  return (
    <header className="flex-shrink-0 h-16 flex items-center justify-end px-6 border-b border-dark-700">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <SearchIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-dark-900 border border-dark-700 rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500 text-gray-200"
          />
        </div>
        <button className="bg-dark-800 border border-dark-700 rounded-md px-4 py-2 hover:bg-dark-700 transition-colors">
          Reset ID
        </button>
        <DarkModeToggle isDarkMode={isDarkMode} onToggle={onToggleDarkMode} />
      </div>
    </header>
  );
};

export default Header;