import React, { useState } from 'react';
import { GuardianShieldIcon } from '../../constants';

interface LoginScreenProps {
  onLogin: (credentials: {role: 'admin' | 'tourist', email?: string, password?: string}) => void;
  onNavigateToRegister: () => void;
  error?: string;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onNavigateToRegister, error }) => {
  const [activeTab, setActiveTab] = useState<'tourist' | 'admin'>('tourist');
  const [localError, setLocalError] = useState('');

  const TouristLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleTouristLogin = () => {
        if (!email || !password) {
            setLocalError('Email and password are required.');
            return;
        }
        setLocalError('');
        onLogin({ role: 'tourist', email, password });
    }

    return (
        <div className="space-y-4">
        <div>
            <label className="text-sm font-medium text-gray-700">Email ID</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none" placeholder="Enter your email" />
        </div>
        <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none" />
        </div>
        <div className="text-right">
            <a href="#" className="text-sm text-cyan-600 hover:underline">Forgot Password?</a>
        </div>
        <button onClick={handleTouristLogin} className="w-full bg-cyan-500 text-white py-3 rounded-lg font-semibold transition-colors hover:bg-cyan-600">
            Login
        </button>
        </div>
    );
  };

  const AdminLogin = () => {
    const [email, setEmail] = useState('admin@gtrails.com');
    const [password, setPassword] = useState('admin123');

     const handleAdminLogin = () => {
        if (!email || !password) {
            setLocalError('Email and password are required.');
            return;
        }
        setLocalError('');
        onLogin({ role: 'admin', email, password });
    }
    return (
        <div className="space-y-4">
        <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@example.com" className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none" />
        </div>
        <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none" />
        </div>
        <button onClick={handleAdminLogin} className="w-full bg-brand-teal text-brand-dark py-3 rounded-lg font-semibold transition-colors hover:bg-opacity-80">
            Login as Admin
        </button>
        </div>
    );
  };
  
  const handleTabSwitch = (tab: 'tourist' | 'admin') => {
      setActiveTab(tab);
      setLocalError('');
      // The main `error` prop will be cleared on the next login attempt in App.tsx
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
            <GuardianShieldIcon className="w-12 h-12 text-cyan-500 mx-auto" />
            <h1 className="text-3xl font-bold mt-2">Welcome to SmartSafar</h1>
            <p className="text-gray-500">Your safe travel companion.</p>
        </div>

        <div className="flex border-b">
          <button onClick={() => handleTabSwitch('tourist')} className={`flex-1 py-3 font-semibold text-center transition-colors ${activeTab === 'tourist' ? 'border-b-2 border-cyan-500 text-cyan-600' : 'text-gray-500'}`}>
            User Login
          </button>
          <button onClick={() => handleTabSwitch('admin')} className={`flex-1 py-3 font-semibold text-center transition-colors ${activeTab === 'admin' ? 'border-b-2 border-brand-teal text-brand-dark' : 'text-gray-500'}`}>
            Admin Login
          </button>
        </div>
        
        {(error || localError) && <p className="text-sm text-red-600 text-center -mb-2">{error || localError}</p>}

        {activeTab === 'tourist' ? <TouristLogin /> : <AdminLogin />}

        <div className="text-center text-sm text-gray-600">
          Don't have an account? <button onClick={onNavigateToRegister} className="font-semibold text-cyan-600 hover:underline">Register now</button>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
