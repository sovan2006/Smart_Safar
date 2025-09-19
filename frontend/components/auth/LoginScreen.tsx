import React, { useState } from 'react';
import { SmartSafarLogoIcon } from '../../constants';
import { Tourist } from '../../types';
import ForgotPasswordModal from './ForgotPasswordModal';

interface LoginScreenProps {
  onLogin: (credentials: {role: 'admin' | 'tourist', email?: string, password?: string}) => Promise<void>;
  onNavigateToRegister: () => void;
  error?: string;
  users: Tourist[];
  onPasswordReset: (email: string, newPassword: string) => Promise<boolean>;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin, onNavigateToRegister, error, users, onPasswordReset }) => {
  const [activeTab, setActiveTab] = useState<'admin' | 'tourist'>('admin');
  const [localError, setLocalError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);

  const TouristLogin = () => {
    const [email, setEmail] = useState('tourist@smartsafar.com');
    const [password, setPassword] = useState('password123');

    const handleTouristLogin = async () => {
        if (!email || !password) {
            setLocalError('Email and password are required.');
            return;
        }
        setLocalError('');
        setIsLoading(true);
        await onLogin({ role: 'tourist', email, password });
        setIsLoading(false);
    }

    return (
        <div className="space-y-4">
            <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email ID</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full mt-1 p-3 border border-light-300 dark:border-dark-700 bg-light-200 dark:bg-dark-800 text-gray-800 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" placeholder="Enter your email" />
            </div>
            <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="w-full mt-1 p-3 border border-light-300 dark:border-dark-700 bg-light-200 dark:bg-dark-800 text-gray-800 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
            </div>
            <div className="text-right">
                <button onClick={() => setIsForgotPasswordOpen(true)} className="text-sm text-primary-600 dark:text-primary-400 hover:underline">Forgot Password?</button>
            </div>
            <button onClick={handleTouristLogin} disabled={isLoading} className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold transition-colors hover:bg-primary-700 disabled:bg-primary-400 disabled:cursor-not-allowed">
                {isLoading ? 'Logging in...' : 'Login as Tourist'}
            </button>
        </div>
    );
  };

  const AdminLogin = () => {
    const [email, setEmail] = useState('admin@smartsafar.com');
    const [password, setPassword] = useState('admin123');

     const handleAdminLogin = async () => {
        if (!email || !password) {
            setLocalError('Email and password are required.');
            return;
        }
        setLocalError('');
        setIsLoading(true);
        await onLogin({ role: 'admin', email, password });
        setIsLoading(false);
    }
    return (
        <div className="space-y-4">
            <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Admin Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@smartsafar.com" className="w-full mt-1 p-3 border border-light-300 dark:border-dark-700 bg-light-200 dark:bg-dark-800 text-gray-800 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
            </div>
            <div>
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" className="w-full mt-1 p-3 border border-light-300 dark:border-dark-700 bg-light-200 dark:bg-dark-800 text-gray-800 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
            </div>
             <div className="text-right h-5"></div>
            <button onClick={handleAdminLogin} disabled={isLoading} className="w-full bg-gray-800 text-white py-3 rounded-lg font-semibold transition-colors hover:bg-gray-700 dark:bg-primary-700 dark:hover:bg-primary-800 disabled:bg-gray-500 disabled:cursor-not-allowed">
                {isLoading ? 'Logging in...' : 'Login as Admin'}
            </button>
        </div>
    );
  };
  
  const handleTabSwitch = (tab: 'tourist' | 'admin') => {
      setActiveTab(tab);
      setLocalError('');
  }

  return (
    <>
        <div className="min-h-screen flex items-center justify-center bg-light-200 dark:bg-dark-900 p-4">
            <div className="w-full max-w-md bg-light-100 dark:bg-dark-800 rounded-2xl shadow-xl p-8 space-y-6">
                <div className="text-center">
                    <SmartSafarLogoIcon className="w-12 h-12 text-primary-600 dark:text-primary-500 mx-auto" />
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">Welcome to SmartSafar</h1>
                    <p className="text-gray-500 dark:text-gray-400">Your safe travel companion.</p>
                </div>

                <div className="flex bg-light-200 dark:bg-dark-700 p-1 rounded-full">
                    <button onClick={() => handleTabSwitch('admin')} className={`w-1/2 py-2 text-sm font-semibold rounded-full transition-colors ${activeTab === 'admin' ? 'bg-white dark:bg-dark-800 text-primary-600 shadow' : 'text-gray-500'}`}>
                        Admin Portal
                    </button>
                    <button onClick={() => handleTabSwitch('tourist')} className={`w-1/2 py-2 text-sm font-semibold rounded-full transition-colors ${activeTab === 'tourist' ? 'bg-white dark:bg-dark-800 text-primary-600 shadow' : 'text-gray-500'}`}>
                        Tourist Login
                    </button>
                </div>
                
                {(error || localError) && <p className="text-sm text-red-600 text-center -mb-2">{error || localError}</p>}

                {activeTab === 'admin' ? <AdminLogin /> : <TouristLogin />}

                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Don't have an account? <button onClick={onNavigateToRegister} className="font-semibold text-primary-600 dark:text-primary-400 hover:underline">Register now</button>
                </div>
            </div>
        </div>
        <ForgotPasswordModal
            isOpen={isForgotPasswordOpen}
            onClose={() => setIsForgotPasswordOpen(false)}
            users={users}
            onPasswordReset={onPasswordReset}
        />
    </>
  );
};

export default LoginScreen;