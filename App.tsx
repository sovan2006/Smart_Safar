import React, { useState } from 'react';
import GuardianTrails from './components/GuardianTrails/GuardianTrails';
import SmartSafar from './components/SmartSafar/SmartSafar';
import LoginScreen from './components/auth/LoginScreen';
import RegisterScreen from './components/auth/RegisterScreen';

type AppView = 'Login' | 'Register' | 'Admin' | 'Tourist';

// Simple user data structure for our mock database
interface UserCredentials {
  email: string;
  password: string;
}

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('Login');
  
  // Mock "database" of registered users. Pre-populate with one user for testing.
  const [users, setUsers] = useState<UserCredentials[]>([
      { email: 'tourist@smartsafar.com', password: 'password123' }
  ]);
  const [loginError, setLoginError] = useState('');

  const handleLogin = (credentials: {role: 'admin' | 'tourist', email?: string, password?: string}) => {
    setLoginError('');
    const { role, email, password } = credentials;

    if (role === 'admin') {
      // Hardcoded admin credentials
      if (email === 'admin@gtrails.com' && password === 'admin123') {
        setView('Admin');
      } else {
        setLoginError('Invalid admin credentials.');
      }
    } else { // Tourist login
      const user = users.find(u => u.email === email && u.password === password);
      if (user) {
        setView('Tourist');
      } else {
        setLoginError('Invalid email or password. Please try again or register.');
      }
    }
  };
  
  const handleRegister = (newUserData: UserCredentials) => {
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
    setView('Login');
  };

  const renderContent = () => {
    switch (view) {
      case 'Login':
        return <LoginScreen onLogin={handleLogin} onNavigateToRegister={() => setView('Register')} error={loginError} />;
      case 'Register':
        return <RegisterScreen onRegister={handleRegister} onNavigateToLogin={() => setView('Login')} />;
      case 'Admin':
        return <GuardianTrails onLogout={handleLogout} />;
      case 'Tourist':
        return <SmartSafar onLogout={handleLogout} />;
      default:
        return <LoginScreen onLogin={handleLogin} onNavigateToRegister={() => setView('Register')} error={loginError} />;
    }
  };
  
  const getAppBg = () => {
    if (view === 'Admin') return 'bg-brand-dark text-gray-300';
    // Let the components handle their own background for a more seamless responsive experience
    return 'bg-gray-100';
  };


  return (
    <div className={`font-sans ${getAppBg()}`}>
      {renderContent()}
    </div>
  );
};

export default App;
