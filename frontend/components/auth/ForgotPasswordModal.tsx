
import React, { useState, useEffect } from 'react';
import { Tourist } from '../../types';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPasswordReset: (email: string, newPassword: string) => boolean;
  users: Tourist[];
}

type Step = 'email' | 'otp' | 'reset' | 'success';

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose, onPasswordReset, users }) => {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [userOtp, setUserOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Reset state when modal is closed/opened
    if (isOpen) {
      setStep('email');
      setEmail('');
      setGeneratedOtp('');
      setUserOtp('');
      setNewPassword('');
      setConfirmPassword('');
      setError('');
      setLoading(false);
    }
  }, [isOpen]);

  const handleSendOtp = () => {
    setError('');
    if (!email) {
      setError('Please enter your email address.');
      return;
    }
    const userExists = users.some(u => u.email === email);
    if (!userExists) {
      setError('No account found with this email address.');
      return;
    }

    setLoading(true);
    // Simulate sending OTP
    setTimeout(() => {
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(otp);
      setLoading(false);
      alert(`Your OTP is: ${otp}`); // For testing purposes
      setStep('otp');
    }, 1000);
  };

  const handleVerifyOtp = () => {
    setError('');
    if (userOtp !== generatedOtp) {
      setError('Invalid OTP. Please try again.');
      return;
    }
    setStep('reset');
  };

  const handleResetPassword = () => {
    setError('');
    if (!newPassword || !confirmPassword) {
      setError('Please fill in both password fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    
    const success = onPasswordReset(email, newPassword);
    if(success) {
        setStep('success');
    } else {
        setError('An unexpected error occurred. Please try again.');
        setStep('email');
    }
  };

  if (!isOpen) return null;

  const renderContent = () => {
    switch (step) {
      case 'email':
        return (
          <>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Forgot Password</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Enter your email and we'll send you an OTP to reset your password.</p>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your registered email" className="w-full mt-1 p-3 border border-light-300 dark:border-dark-700 bg-light-200 dark:bg-dark-800 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"/>
            <button onClick={handleSendOtp} disabled={loading} className="w-full mt-4 bg-primary-600 text-white py-3 rounded-lg font-semibold transition-colors hover:bg-primary-700 disabled:bg-primary-400">
              {loading ? 'Sending...' : 'Send OTP'}
            </button>
          </>
        );
      case 'otp':
        return (
          <>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Verify OTP</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">An OTP has been sent to {email}.</p>
            <input type="text" value={userOtp} onChange={(e) => setUserOtp(e.target.value)} placeholder="Enter 6-digit OTP" maxLength={6} className="w-full mt-1 p-3 border border-light-300 dark:border-dark-700 bg-light-200 dark:bg-dark-800 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"/>
            <button onClick={handleVerifyOtp} className="w-full mt-4 bg-primary-600 text-white py-3 rounded-lg font-semibold transition-colors hover:bg-primary-700">
              Verify OTP
            </button>
             <button onClick={() => setStep('email')} className="text-sm text-gray-500 dark:text-gray-400 mt-2 hover:underline">Change email</button>
          </>
        );
      case 'reset':
        return (
          <>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Reset Password</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Create a new password for your account.</p>
            <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="New Password" className="w-full mt-1 p-3 border border-light-300 dark:border-dark-700 bg-light-200 dark:bg-dark-800 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"/>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm New Password" className="w-full mt-4 p-3 border border-light-300 dark:border-dark-700 bg-light-200 dark:bg-dark-800 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"/>
            <button onClick={handleResetPassword} className="w-full mt-4 bg-primary-600 text-white py-3 rounded-lg font-semibold transition-colors hover:bg-primary-700">
              Reset Password
            </button>
          </>
        );
      case 'success':
        return (
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-green-100 dark:bg-green-500/20 text-green-600 dark:text-green-300 rounded-full flex items-center justify-center text-3xl mb-4">✓</div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Password Reset!</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Your password has been successfully reset. You can now log in with your new password.</p>
            <button onClick={onClose} className="w-full mt-4 bg-primary-600 text-white py-3 rounded-lg font-semibold transition-colors hover:bg-primary-700">
              Back to Login
            </button>
          </div>
        );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-light-100 dark:bg-dark-800 rounded-2xl shadow-xl p-6 w-full max-w-sm" onClick={e => e.stopPropagation()}>
        <div className="relative">
          {step !== 'success' && (
            <button onClick={onClose} className="absolute -top-2 -right-2 text-gray-500 dark:text-gray-400 text-2xl">&times;</button>
          )}
          {error && <p className="text-sm text-red-600 text-center mb-4 bg-red-100 dark:bg-red-900/50 p-2 rounded-lg">{error}</p>}
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;