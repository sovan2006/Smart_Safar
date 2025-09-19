import React, { useState, useEffect } from 'react';
import GuardianTrails from './components/GuardianTrails/GuardianTrails';
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
  const [token, setToken] = useState<string|null>(localStorage.getItem('token'));

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

  useEffect(() => {
    // Load mock tourist data on initial load
    setTourists(MOCK_TOURISTS_DATA);
  }, []);

  useEffect(() => {
    // This effect runs on component mount to check if a user is already logged in.
    if (token && tourists.length > 0) {
        // For mock purposes, if a token exists, we find the user by email stored in the token.
        // A real token would be decoded and verified.
        const loggedInEmail = localStorage.getItem('loggedInEmail');
        const user = tourists.find(t => t.email === loggedInEmail);
        if(user) {
            setCurrentUser(user);
            setView('Tourist');
        } else {
            handleLogout();
        }
    }
  }, [token, tourists]);

  const handleLogin = async (credentials: {role: 'admin' | 'tourist', email?: string, password?: string}) => {
    setLoginError('');
    const { role, email, password } = credentials;

    if (role === 'admin') {
      if (email === 'admin@smartsafar.com' && password === 'admin123') {
        setView('Admin');
      } else {
        setLoginError('Invalid admin credentials.');
      }
    } else { // Tourist login
      const user = tourists.find(t => t.email === email && t.password === password);
      if (user) {
          const mockToken = `mock-token-for-${user.email}`;
          localStorage.setItem('token', mockToken);
          localStorage.setItem('loggedInEmail', user.email);
          setToken(mockToken);
          setCurrentUser(user);
          setView('Tourist');
      } else {
          setLoginError('Invalid email or password.');
      }
    }
  };
  
  const handleRegister = (newUserData: Omit<Tourist, 'id'>) => {
    const userExists = tourists.some(t => t.email === newUserData.email);
    if(userExists) {
        alert('User with this email already exists.');
        return;
    }

    const newUser: Tourist = {
        ...newUserData,
        touristId: `T-${Math.floor(10000 + Math.random() * 90000)}`,
    };
    setTourists(prev => [...prev, newUser]);
    alert('Registration successful! Please log in.');
    setView('Login');
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInEmail');
    setToken(null);
    setCurrentUser(null);
    setLoginError('');
    setView('Login');
  };
  
  const handlePasswordReset = (email: string, newPassword: string): Promise<boolean> => {
    setLoginError('');
    const userIndex = tourists.findIndex(u => u.email === email);
    if (userIndex !== -1) {
        const updatedTourists = [...tourists];
        updatedTourists[userIndex].password = newPassword;
        setTourists(updatedTourists);
        return Promise.resolve(true);
    }
    setLoginError('Could not find user with that email.');
    return Promise.resolve(false);
  };

  const handleLocationUpdate = (location: { lat: number; lng: number }) => {
    if (currentUser) {
      // Optimistic UI update
      const updatedUser = { ...currentUser, location: { ...location, timestamp: Date.now() } };
      setCurrentUser(updatedUser);
      setTourists(prev => prev.map(t => t.email === currentUser.email ? updatedUser : t));
    }
  };

  const handleSwitchToTouristView = () => {
    if (tourists.length > 0) {
      setCurrentUser(tourists[0]); // Default to the first tourist for the demo
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
        users: tourists, // Used for forgot password email check
        onPasswordReset: handlePasswordReset
    };
    switch (view) {
      case 'Login':
        return <LoginScreen {...loginProps} error={loginError} />;
      case 'Register':
        return <RegisterScreen onRegister={handleRegister} onNavigateToLogin={() => setView('Login')} />;
      case 'Admin':
        return <GuardianTrails onLogout={handleLogout} isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />;
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