import React from 'react';
import { AdminPage } from '../../types';
import { GuardianShieldIcon, DashboardIcon, IncidentIcon, ReportsIcon, UsersIcon, SettingsIcon, LogoutIcon } from '../../constants';

interface SidebarProps {
  activePage: AdminPage;
  setActivePage: (page: AdminPage) => void;
  onLogout: () => void;
}

const NavItem: React.FC<{ icon: React.ReactNode; label: AdminPage; isActive: boolean; onClick: () => void; }> = ({ icon, label, isActive, onClick }) => (
  <li
    className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors ${
      isActive ? 'bg-brand-teal text-brand-dark font-semibold' : 'hover:bg-brand-dark-secondary'
    }`}
    onClick={onClick}
  >
    {icon}
    <span>{label}</span>
  </li>
);

const Sidebar: React.FC<SidebarProps> = ({ activePage, setActivePage, onLogout }) => {
  const navItems: { label: AdminPage, icon: React.ReactNode }[] = [
    { label: 'Dashboard', icon: <DashboardIcon className="w-6 h-6" /> },
    { label: 'Incident Management', icon: <IncidentIcon className="w-6 h-6" /> },
    { label: 'Incident Response', icon: <IncidentIcon className="w-6 h-6" /> },
    { label: 'Reports', icon: <ReportsIcon className="w-6 h-6" /> },
    { label: 'User & Roles', icon: <UsersIcon className="w-6 h-6" /> },
    { label: 'Settings', icon: <SettingsIcon className="w-6 h-6" /> },
  ];

  return (
    <aside className="w-64 bg-brand-dark-secondary flex-shrink-0 p-4 flex flex-col justify-between border-r border-brand-border">
      <div>
        <div className="flex items-center space-x-2 p-3 mb-6">
          <GuardianShieldIcon className="w-8 h-8 text-brand-teal" />
          <span className="text-xl font-bold">Guardian Trails</span>
        </div>
        <nav>
          <ul className="space-y-2">
            {navItems.map(item => (
              <NavItem
                key={item.label}
                icon={item.icon}
                label={item.label}
                isActive={activePage === item.label}
                onClick={() => setActivePage(item.label)}
              />
            ))}
          </ul>
        </nav>
      </div>
      <button
        onClick={onLogout}
        className="flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-colors hover:bg-brand-dark-secondary w-full"
      >
        <LogoutIcon className="w-6 h-6" />
        <span>Logout</span>
      </button>
    </aside>
  );
};

export default Sidebar;
