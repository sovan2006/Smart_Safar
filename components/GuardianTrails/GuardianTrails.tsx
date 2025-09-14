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
}

const GuardianTrails: React.FC<GuardianTrailsProps> = ({ onLogout }) => {
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
    <div className="flex h-screen w-full">
      <Sidebar activePage={activePage} setActivePage={setActivePage} onLogout={onLogout} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default GuardianTrails;
