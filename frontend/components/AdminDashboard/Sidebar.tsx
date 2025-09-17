
import React from 'react';
import { AdminPage } from '../../types';
import { SmartSafarLogoIcon, DashboardIcon, IncidentIcon, ReportsIcon, UsersIcon, SettingsIcon, LogoutIcon, SwitchIcon } from '../../constants';

interface SidebarProps {
  activePage: AdminPage;
  setActivePage: (page: AdminPage) => void;
  onLogout: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const NavItem: React.FC<{ icon: React.ReactNode; label: AdminPage; isActive: boolean; onClick: () => void; }> = ({ icon, label, isActive, onClick }) => (
  <li>
    <a
      href="#"
      onClick={(e) => { e.preventDefault(); onClick(); }}
      className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors relative ${
        isActive ? 'bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-300 font-semibold' : 'text-gray-500 dark:text-gray-400 hover:bg-light-200 dark:hover:bg-dark-700 hover:text-gray-800 dark:hover:text-gray-200'
      }`}
      aria-current={isActive ? 'page' : undefined}
    >
      {isActive && <div className="absolute left-0 top-2 bottom-2 w-1 bg-primary-600 rounded-r-full"></div>}
      {icon}
      <span className="flex-1">{label}</span>
    </a>
  </li>
);

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, onLogout, isOpen, setIsOpen }) => {
  const navItems: { label: AdminPage, icon: React.ReactNode }[] = [
    { label: 'Dashboard', icon: <DashboardIcon className="w-6 h-6" /> },
    { label: 'Incident Management', icon: <IncidentIcon className="w-6 h-6" /> },
    { label: 'Incident Response', icon: <IncidentIcon className="w-6 h-6" /> },
    { label: 'Reports', icon: <ReportsIcon className="w-6 h-6" /> },
    { label: 'User & Roles', icon: <UsersIcon className="w-6 h-6" /> },
    { label: 'Settings', icon: <SettingsIcon className="w-6 h-6" /> },
  ];

  const handleNavClick = (page: AdminPage) => {
      setActivePage(page);
      if (window.innerWidth < 768) { // md breakpoint
          setIsOpen(false);
      }
  };

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && <div onClick={() => setIsOpen(false)} className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"></div>}

      <aside className={`fixed md:relative top-0 left-0 h-full z-30 w-64 bg-light-100 dark:bg-dark-800 flex-shrink-0 p-4 flex flex-col justify-between border-r border-light-300 dark:border-dark-700 transition-transform transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        <div>
          <div className="flex items-center justify-between p-2 mb-6">
            <div className="flex items-center space-x-3">
              <SmartSafarLogoIcon className="w-8 h-8 text-primary-500" />
              <div className='flex flex-col'>
                <span className="text-xl font-bold text-gray-800 dark:text-gray-200">SmartSafar</span>
                <span className="text-xs font-semibold bg-primary-100 text-primary-700 dark:bg-primary-500/20 dark:text-primary-300 px-2 py-0.5 rounded-full">Admin</span>
              </div>
            </div>
             <button onClick={() => setIsOpen(false)} className="md:hidden text-gray-500 dark:text-gray-400 p-2 text-2xl" aria-label="Close sidebar">&times;</button>
          </div>
          <nav>
            <ul className="space-y-2">
              {navItems.map(item => (
                <NavItem
                  key={item.label}
                  icon={item.icon}
                  label={item.label}
                  isActive={activePage === item.label}
                  onClick={() => handleNavClick(item.label)}
                />
              ))}
            </ul>
          </nav>
        </div>
        <div className="border-t border-light-300 dark:border-dark-700 pt-4 space-y-2">
           <button
              className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors w-full text-gray-500 dark:text-gray-400 hover:bg-light-200 dark:hover:bg-dark-700 hover:text-gray-800 dark:hover:text-gray-200"
            >
              <SwitchIcon className="w-6 h-6" />
              <span>Switch to Tourist View</span>
          </button>
          <button
            onClick={onLogout}
            className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors w-full text-gray-500 dark:text-gray-400 hover:bg-light-200 dark:hover:bg-dark-700 hover:text-gray-800 dark:hover:text-gray-200"
          >
            <LogoutIcon className="w-6 h-6" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
