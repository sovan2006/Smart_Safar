import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from './Dashboard';
import IncidentManagement from './IncidentManagement';
import IncidentResponse from './IncidentResponse';
import Reports from './Reports';
import UserRoles from './UserRoles';
import Settings from './Settings';
import { AdminPage } from '../../types';

interface GuardianTrailsProps {
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const GuardianTrails: React.FC<GuardianTrailsProps> = ({ onLogout, isDarkMode, onToggleDarkMode }) => {
  const [activePage, setActivePage] = useState<AdminPage>('Dashboard');

  const renderContent = () => {
    switch (activePage) {
      case 'Dashboard':
        return <Dashboard />;
      case 'Incident Management':
        return <IncidentManagement />;
      case 'Incident Response':
        return <IncidentResponse />;
      case 'Reports':
        return <Reports />;
      case 'User & Roles':
        return <UserRoles />;
      case 'Settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-dark-900 text-gray-300">
      <Sidebar activePage={activePage} setActivePage={setActivePage} onLogout={onLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header isDarkMode={isDarkMode} onToggleDarkMode={onToggleDarkMode} />
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default GuardianTrails;