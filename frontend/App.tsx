import React, { useState, useEffect } from 'react';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import SmartSafar from './components/SmartSafar/SmartSafar';
import LoginScreen from './components/auth/LoginScreen';
import RegisterScreen from './components/auth/RegisterScreen';
import SOSButton from './components/shared/SOSButton';
import { Tourist } from './types';

type AppView = 'Login' | 'Register' | 'Admin' | 'Tourist';

const API_URL = '/api';

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
    // Fetch all tourist data on initial load for features like password reset
    const fetchAllTourists = async () => {
        try {
            const res = await fetch(`${API_URL}/users/tourists`);
            if (res.ok) {
                const data = await res.json();
                setTourists(data);
            } else {
                console.error("Failed to fetch initial tourist data: Server responded with status", res.status);
            }
        } catch (e) {
            console.error("Failed to fetch initial tourist data:", e);
        }
    };
    fetchAllTourists();
  }, []);

  useEffect(() => {
    // This effect runs once on component mount to check if a user is already logged in.
    const verifyUser = async () => {
      if (token) {
        try {
          const response = await fetch(`${API_URL}/auth/me`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          if (response.ok) {
            const userData = await response.json();
            setCurrentUser(userData);
            setView('Tourist'); // Or determine view based on user role
          } else {
            // Token is invalid or expired
            handleLogout();
          }
        } catch (error) {
          console.error('Verification failed', error);
          handleLogout();
        }
      }
    };
    verifyUser();
  }, [token]);

  const handleLogin = async (credentials: {role: 'admin' | 'tourist', email?: string, password?: string}) => {
    setLoginError('');
    const { role, email, password } = credentials;

    if (role === 'admin') {
      if (email === 'admin@smartsafar.com' && password === 'admin123') {
        // Admin login doesn't need to re-fetch tourists if already loaded
        setView('Admin');
      } else {
        setLoginError('Invalid admin credentials.');
      }
    } else { // Tourist login
      try {
        const res = await fetch(`${API_URL}/auth/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const data = await res.json();
        if (res.ok) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          setCurrentUser(data);
          setView('Tourist');
        } else {
          setLoginError(data.message || 'Invalid email or password.');
        }
      } catch (e) {
         setLoginError('Failed to connect to the server.');
      }
    }
  };
  
  const handleRegister = async (newUserData: Pick<Tourist, 'fullName' | 'mobileNumber' | 'email' | 'password'>) => {
    try {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUserData),
        });
        const data = await res.json();
        if (res.ok) {
            alert('Registration successful! Please log in.');
            setView('Login');
        } else {
            alert(data.message || 'Registration failed.');
        }
    } catch(e) {
        alert('Failed to connect to the server.');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setCurrentUser(null);
    setLoginError('');
    setView('Login');
  };
  
  const handlePasswordReset = async (email: string, newPassword: string): Promise<boolean> => {
     try {
        const response = await fetch(`${API_URL}/auth/resetpassword`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, newPassword }),
        });
        if (response.ok) return true;
        const data = await response.json();
        setLoginError(data.message); // Show error on login screen
        return false;
    } catch (error) {
        console.error('Password reset failed', error);
        setLoginError('Failed to connect to the server.');
        return false;
    }
  };

  const handleLocationUpdate = async (location: { lat: number; lng: number }) => {
    if (currentUser && token) {
      // Optimistic UI update
      const updatedUser = { ...currentUser, location: { ...location, timestamp: Date.now() } };
      setCurrentUser(updatedUser);
      setTourists(prev => prev.map(t => t.email === currentUser.email ? updatedUser : t));

      try {
          await fetch(`${API_URL}/users/location`, {
              method: 'PUT',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify(location)
          });
      } catch (error) {
          console.error("Failed to update location on server", error);
          // Optional: handle error, maybe revert optimistic update
      }
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
        return <AdminDashboard tourists={tourists} onLogout={handleLogout} isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} onSwitchToTouristView={handleSwitchToTouristView} />;
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