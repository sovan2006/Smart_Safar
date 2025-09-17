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
import { AdminPage, Tourist } from '../../types';

interface AdminDashboardProps {
  onLogout: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  tourists: Tourist[];
  onSwitchToTouristView: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onLogout, isDarkMode, onToggleDarkMode, tourists, onSwitchToTouristView }) => {
  const [activePage, setActivePage] = useState<AdminPage>('Incident Response');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderContent = () => {
    switch (activePage) {
      case 'Dashboard':
        return <Dashboard tourists={tourists} />;
      case 'Incident Management':
        return <IncidentManagement tourists={tourists} />;
      case 'Incident Response':
        return <IncidentResponse tourists={tourists} />;
      case 'Reports':
        return <Reports />;
      case 'User & Roles':
        return <UserRoles />;
      case 'Settings':
        return <Settings />;
      case 'Profile':
        return <Profile />;
      default:
        return <IncidentManagement tourists={tourists} />;
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
        onSwitchToTouristView={onSwitchToTouristView}
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