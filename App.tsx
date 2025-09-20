import React, { useState, useEffect } from 'react';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import SmartSafar from './components/SmartSafar/SmartSafar';
import LoginScreen from './components/auth/LoginScreen';
import RegisterScreen from './components/auth/RegisterScreen';
import SOSButton from './components/shared/SOSButton';
import { Tourist } from './types';
import { MOCK_TOURISTS_DATA } from './constants';

type AppView = 'Login' | 'Register' | 'Admin' | 'Tourist';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('Login');
  const [tourists, setTourists] = useState<Tourist[]>([]);
  const [currentUser, setCurrentUser] = useState<Tourist | null>(null);
  const [loginError, setLoginError] = useState('');
  const [isAppLoading, setIsAppLoading] = useState(true);

  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);
  
  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    setLoginError('');
    setView('Login');
  };

  useEffect(() => {
    setIsAppLoading(true);
    setLoginError('');
    
    // Load mock tourist data into state
    setTourists(MOCK_TOURISTS_DATA);

    // Check for a saved user session in localStorage
    const savedUserJson = localStorage.getItem('currentUser');
    if (savedUserJson) {
      try {
        const user: Tourist = JSON.parse(savedUserJson);
        setCurrentUser(user);
        setView('Tourist');
      } catch (error) {
        console.error("Failed to parse user from localStorage", error);
        localStorage.removeItem('currentUser');
      }
    }

    setIsAppLoading(false);
  }, []);

  const handleLogin = async (credentials: {role: 'admin' | 'tourist', email?: string, password?: string}) => {
    setLoginError('');
    const { role, email, password } = credentials;

    if (role === 'admin') {
      if (email === 'admin@smartsafar.com' && password === 'admin123') {
        setView('Admin');
      } else {
        setLoginError('Invalid admin credentials.');
      }
    } else {
      // Simulate tourist login against mock data
      const foundUser = MOCK_TOURISTS_DATA.find(
        user => user.email === email && user.password === password
      );
      
      if (foundUser) {
        // Create a copy to avoid modifying the constant
        const userToSave = { ...foundUser };
        localStorage.setItem('currentUser', JSON.stringify(userToSave));
        setCurrentUser(userToSave);
        setView('Tourist');
      } else {
        setLoginError('Invalid email or password.');
      }
    }
  };
  
  const handleRegister = async (newUserData: Pick<Tourist, 'fullName' | 'mobileNumber' | 'email' | 'password'>) => {
    // This is a mock registration. It doesn't persist the new user.
    alert('Registration successful! Please log in.');
    setView('Login');
  };
  
  const handlePasswordReset = async (email: string, newPassword: string): Promise<boolean> => {
    setLoginError('');
    const userExists = MOCK_TOURISTS_DATA.some(user => user.email === email);
    if (userExists) {
        // In a real app, you'd update the password. Here, we just confirm success.
        console.log(`Password for ${email} has been reset to "${newPassword}" (simulation).`);
        return true;
    } else {
        setLoginError('No account found with this email address.');
        return false;
    }
  };

  const handleLocationUpdate = async (location: { lat: number; lng: number }) => {
    if (currentUser) {
      const updatedUser = { ...currentUser, location: { ...location, timestamp: Date.now() } };
      setCurrentUser(updatedUser);
      setTourists(prev => prev.map(t => t.email === currentUser.email ? updatedUser : t));
      // No server update needed; location is updated in the local state.
    }
  };
  
  const handleUpdateUser = (updatedUser: Tourist) => {
    setCurrentUser(updatedUser);
    setTourists(prev => prev.map(t => t.email === updatedUser.email ? updatedUser : t));
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
  };

  const handleSwitchToTouristView = () => {
    if (tourists.length > 0) {
      setCurrentUser(tourists[0]);
      setView('Tourist');
    } else {
      alert("No tourist accounts are available to display.");
    }
  };

  const renderContent = () => {
    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
    const loginProps = {
        onLogin: handleLogin,
        onNavigateToRegister: () => setView('Register'),
        users: tourists,
        onPasswordReset: handlePasswordReset
    };
    switch (view) {
      case 'Login':
        return <LoginScreen {...loginProps} error={loginError} />;
      case 'Register':
        return <RegisterScreen onRegister={handleRegister} onNavigateToLogin={() => setView('Login')} />;
      case 'Admin':
        return <AdminDashboard tourists={tourists} onLogout={handleLogout} isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} onSwitchToTouristView={handleSwitchToTouristView} />;
      case 'Tourist':
        return currentUser ? <SmartSafar currentUser={currentUser} onLogout={handleLogout} isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} onLocationUpdate={handleLocationUpdate} onUpdateUser={handleUpdateUser} /> : <LoginScreen {...loginProps} error={'Session expired. Please log in again.'} />;
      default:
        return <LoginScreen {...loginProps} error={loginError} />;
    }
  };
  
  const getAppBg = () => {
    return 'bg-light-200 dark:bg-dark-900 text-gray-800 dark:text-gray-300';
  };

  if (isAppLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-light-200 dark:bg-dark-900">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className={`font-sans ${getAppBg()} transition-colors duration-300`}>
      {renderContent()}
      {view === 'Tourist' && <SOSButton currentUser={currentUser} />}
    </div>
  );
};

export default App;