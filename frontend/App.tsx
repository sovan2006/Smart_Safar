import React, { useState, useEffect } from 'react';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import SmartSafar from './components/SmartSafar/SmartSafar';
import LoginScreen from './components/auth/LoginScreen';
import RegisterScreen from './components/auth/RegisterScreen';
import SOSButton from './components/shared/SOSButton';
import { Tourist } from './types';

type AppView = 'Login' | 'Register' | 'Admin' | 'Tourist';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('Login');
  const [tourists, setTourists] = useState<Tourist[]>([]);
  const [currentUser, setCurrentUser] = useState<Tourist | null>(null);
  const [loginError, setLoginError] = useState('');
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
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
    localStorage.removeItem('token');
    setToken(null);
    setCurrentUser(null);
    setLoginError('');
    setView('Login');
  };

  useEffect(() => {
    const initializeApp = async () => {
      setIsAppLoading(true);
      setLoginError('');
      
      try {
        const touristsResponse = await fetch('/api/users/tourists');
        if (!touristsResponse.ok) {
          throw new Error(`Failed to fetch initial tourist data: Server responded with status ${touristsResponse.status}`);
        }
        const touristsData: Tourist[] = await touristsResponse.json();
        setTourists(touristsData);
      } catch (error) {
        console.error(error);
        setLoginError(error instanceof Error ? error.message : 'Could not load required app data.');
        setTourists([]);
      }

      const existingToken = localStorage.getItem('token');
      if (existingToken) {
        try {
          const meResponse = await fetch('/api/auth/me', {
            headers: { 'Authorization': `Bearer ${existingToken}` },
          });

          if (meResponse.ok) {
            const user: Tourist = await meResponse.json();
            setCurrentUser(user);
            setView('Tourist');
          } else {
            handleLogout(); 
          }
        } catch (error) {
          console.error("Session check failed:", error);
          handleLogout();
        }
      }
      setIsAppLoading(false);
    };

    initializeApp();
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
      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Login failed');
        }
        localStorage.setItem('token', data.token);
        setToken(data.token);
        setCurrentUser(data);
        setView('Tourist');
      } catch (error) {
        setLoginError(error instanceof Error ? error.message : 'An unknown error occurred.');
      }
    }
  };
  
  const handleRegister = async (newUserData: Pick<Tourist, 'fullName' | 'mobileNumber' | 'email' | 'password'>) => {
    try {
        const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUserData),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Registration failed');
        }
        alert('Registration successful! Please log in.');
        setView('Login');
    } catch (error) {
        alert(error instanceof Error ? error.message : 'An unknown error occurred during registration.');
    }
  };
  
  const handlePasswordReset = async (email: string, newPassword: string): Promise<boolean> => {
    setLoginError('');
    try {
        const response = await fetch('/api/auth/resetpassword', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, newPassword }),
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Password reset failed');
        }
        return true;
    } catch (error) {
        setLoginError(error instanceof Error ? error.message : 'An unknown error occurred.');
        return false;
    }
  };

  const handleLocationUpdate = async (location: { lat: number; lng: number }) => {
    if (currentUser && token) {
      const updatedUser = { ...currentUser, location: { ...location, timestamp: Date.now() } };
      setCurrentUser(updatedUser);
      setTourists(prev => prev.map(t => t.email === currentUser.email ? updatedUser : t));

      try {
          await fetch('/api/users/location', {
              method: 'PUT',
              headers: { 
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`
              },
              body: JSON.stringify(location),
          });
      } catch (error) {
          console.error("Failed to update location on server:", error);
      }
    }
  };
  
  const handleUpdateUser = async (updatedUserData: Tourist) => {
    if (!token) {
      setLoginError("You must be logged in to update your profile.");
      return;
    }
    try {
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUserData),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update profile.');
      }
      setCurrentUser(data);
      setTourists(prev => prev.map(t => t.email === data.email ? data : t));
    } catch (error) {
      console.error("Profile update error:", error);
      // Optionally, set an error state to show in the UI
    }
  };

  const handleToggleTracking = async () => {
    if (!currentUser) return;
    const updatedUser = { ...currentUser, isTrackingEnabled: !currentUser.isTrackingEnabled };
    await handleUpdateUser(updatedUser);
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
        return currentUser ? <SmartSafar currentUser={currentUser} onLogout={handleLogout} isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} onLocationUpdate={handleLocationUpdate} onUpdateUser={handleUpdateUser} isTrackingEnabled={currentUser.isTrackingEnabled || false} onToggleTracking={handleToggleTracking} /> : <LoginScreen {...loginProps} error={'Session expired. Please log in again.'} />;
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