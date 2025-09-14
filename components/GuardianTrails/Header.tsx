
import React from 'react';
import { SearchIcon } from '../../constants';

const Header: React.FC = () => {
  return (
    <header className="flex-shrink-0 h-16 flex items-center justify-end px-6 border-b border-brand-border">
      <div className="flex items-center space-x-4">
        <div className="relative">
          <SearchIcon className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-brand-dark border border-brand-border rounded-md pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-brand-teal"
          />
        </div>
        <button className="bg-brand-dark-secondary border border-brand-border rounded-md px-4 py-2 hover:bg-brand-border transition-colors">
          Reset ID
        </button>
      </div>
    </header>
  );
};

export default Header;
