import React, { useState, useEffect } from 'react';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import SmartSafar from './components/SmartSafar/SmartSafar';
import LoginScreen from './components/auth/LoginScreen';
import RegisterScreen from './components/auth/RegisterScreen';
import SOSButton from './components/shared/SOSButton';
import { Tourist } from './types';
import { MOCK_TOURISTS } from './database';

type AppView = 'Login' | 'Register' | 'Admin' | 'Tourist';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('Login');
  
  // Mock "database" of registered users.
  const [users, setUsers] = useState<Tourist[]>(MOCK_TOURISTS);
  const [currentUser, setCurrentUser] = useState<Tourist | null>(null);
  const [loginError, setLoginError] = useState('');

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


  const handleLogin = (credentials: {role: 'admin' | 'tourist', email?: string, password?: string}) => {
    setLoginError('');
    const { role, email, password } = credentials;

    if (role === 'admin') {
      // Hardcoded admin credentials
      if (email === 'admin@smartsafar.com' && password === 'admin123') {
        setView('Admin');
      } else {
        setLoginError('Invalid admin credentials.');
      }
    } else { // Tourist login
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        setCurrentUser(user);
        setView('Tourist');
      } else {
        setLoginError('Invalid email or password. Please try again or register.');
      }
    }
  };
  
  const handleRegister = (newUserData: Tourist) => {
    // Check if user already exists
    if (users.some(user => user.email === newUserData.email)) {
        // In a real app, you would show an error on the registration page itself.
        // For simplicity, we'll just alert and stay on the registration page.
        alert('This email is already registered.');
        return;
    }
    setUsers([...users, newUserData]);
    alert('Registration successful! Please log in.');
    setView('Login');
  };

  const handleLogout = () => {
    setLoginError('');
    setCurrentUser(null);
    setView('Login');
  };
  
  const handlePasswordReset = (email: string, newPassword: string): boolean => {
    const userIndex = users.findIndex(u => u.email === email);
    if (userIndex > -1) {
        const updatedUsers = [...users];
        const updatedUser = { ...updatedUsers[userIndex], password: newPassword };
        updatedUsers[userIndex] = updatedUser;
        setUsers(updatedUsers);
        return true;
    }
    return false;
  };

  const handleLocationUpdate = (location: { lat: number; lng: number }) => {
    if (currentUser) {
      const updatedUsers = users.map(user =>
        user.email === currentUser.email
          ? { ...user, location: { ...location, timestamp: Date.now() } }
          : user
      );
      setUsers(updatedUsers);

      setCurrentUser(prev => prev ? { ...prev, location: { ...location, timestamp: Date.now() } } : null);
    }
  };

  const handleSwitchToTouristView = () => {
    if (users.length > 0) {
      setCurrentUser(users[0]); // Default to the first tourist for the demo
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
        users: users,
        onPasswordReset: handlePasswordReset
    };
    switch (view) {
      case 'Login':
        return <LoginScreen {...loginProps} error={loginError} />;
      case 'Register':
        return <RegisterScreen onRegister={handleRegister} onNavigateToLogin={() => setView('Login')} />;
      case 'Admin':
        return <AdminDashboard tourists={users} onLogout={handleLogout} isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} onSwitchToTouristView={handleSwitchToTouristView} />;
      case 'Tourist':
        return currentUser ? <SmartSafar currentUser={currentUser} onLogout={handleLogout} isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} onLocationUpdate={handleLocationUpdate} /> : <LoginScreen {...loginProps} error={'Session expired. Please log in again.'} />;
      default:
        return <LoginScreen {...loginProps} error={loginError} />;
    }
  };
  
  const getAppBg = () => {
    return 'bg-light-200 dark:bg-dark-900 text-gray-800 dark:text-gray-300';
  };


  return (
    <div className={`font-sans ${getAppBg()} transition-colors duration-300`}>
      {renderContent()}
      {view === 'Tourist' && <SOSButton />}
    </div>
  );
};

export default App;
