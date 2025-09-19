import React, { useState } from 'react';
import { Tourist } from '../../types';

interface RegisterScreenProps {
  onNavigateToLogin: () => void;
  onRegister: (userData: Omit<Tourist, 'id'>) => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onNavigateToLogin, onRegister }) => {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !mobileNumber || !email || !password || !confirmPassword) {
      setError('All fields are required.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    // Simple email validation
    if (!/\S+@\S+\.\S+/.test(email)) {
        setError('Please enter a valid email address.');
        return;
    }
    setError('');
    onRegister({ fullName, mobileNumber, email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-light-200 dark:bg-dark-900 p-4">
      <div className="w-full max-w-md bg-light-100 dark:bg-dark-800 rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Create Account</h1>
            <p className="text-gray-500 dark:text-gray-400">Join SmartSafar for a safer journey.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Full Name</label>
            <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="John Doe" className="w-full mt-1 p-3 border border-light-300 dark:border-dark-700 bg-light-200 dark:bg-dark-800 text-gray-800 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Mobile Number</label>
            <input type="tel" value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} placeholder="+91 12345 67890" className="w-full mt-1 p-3 border border-light-300 dark:border-dark-700 bg-light-200 dark:bg-dark-800 text-gray-800 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
          </div>
           <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email ID</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="w-full mt-1 p-3 border border-light-300 dark:border-dark-700 bg-light-200 dark:bg-dark-800 text-gray-800 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a strong password" className="w-full mt-1 p-3 border border-light-300 dark:border-dark-700 bg-light-200 dark:bg-dark-800 text-gray-800 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
          </div>
           <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Re-enter your password" className="w-full mt-1 p-3 border border-light-300 dark:border-dark-700 bg-light-200 dark:bg-dark-800 text-gray-800 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
          </div>
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          <button type="submit" className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold transition-colors hover:bg-primary-700">
            Register
          </button>
          <p className="text-xs text-center text-gray-500 dark:text-gray-400">
            ✓ Your identity will be secured on the SmartSafar private blockchain.
          </p>
        </form>

        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          Already have an account? <button onClick={onNavigateToLogin} className="font-semibold text-primary-600 dark:text-primary-400 hover:underline">Login</button>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;