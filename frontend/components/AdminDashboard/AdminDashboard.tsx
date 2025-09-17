
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Dashboard from './Dashboard';
import IncidentManagement from './IncidentManagement';
import IncidentResponse from './IncidentResponse';
import Reports from './Reports';
import UserRoles from './UserRoles';
import Settings from './Settings';
import Profile from './Profile';
import { AdminPage } from '../../types';

interface AdminDashboardProps {
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, isDarkMode, onToggleDarkMode }) => {
  const [activePage, setActivePage] = useState<AdminPage>('Incident Management');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
      case 'Profile':
        return <Profile />;
      default:
        return <IncidentManagement />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-light-200 dark:bg-dark-900 md:overflow-hidden">
      <Sidebar 
        activePage={activePage} 
        setActivePage={setActivePage} 
        onLogout={onLogout}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header 
            isDarkMode={isDarkMode} 
            onToggleDarkMode={onToggleDarkMode} 
            pageTitle={activePage} 
            userName="Admin"
            onLogout={onLogout}
            onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
            setActivePage={setActivePage}
        />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-light-200 dark:bg-dark-900">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;