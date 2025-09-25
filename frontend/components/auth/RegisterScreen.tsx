import React, { useState } from 'react';
import { Tourist } from '../../types';

interface RegisterScreenProps {
  onNavigateToLogin: () => void;
  onRegister: (userData: Pick<Tourist, 'fullName' | 'mobileNumber' | 'email' | 'password'>) => void;
}

const RegisterScreen: React.FC<RegisterScreenProps> = ({ onNavigateToLogin, onRegister }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const validateForm = () => {
    const { fullName, mobileNumber, email, password, confirmPassword } = formData;
    const newErrors = { fullName: '', mobileNumber: '', email: '', password: '', confirmPassword: '' };
    let isValid = true;
  
    if (!fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
      isValid = false;
    }
    if (!mobileNumber.trim()) {
      newErrors.mobileNumber = 'Mobile Number is required.';
      isValid = false;
    } else if (!/^\+?[0-9\s-]{10,}$/.test(mobileNumber)) {
      newErrors.mobileNumber = 'Please enter a valid mobile number.';
      isValid = false;
    }
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address.';
      isValid = false;
    }
    if (!password) {
      newErrors.password = 'Password is required.';
      isValid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
      isValid = false;
    }
    if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
      isValid = false;
    }
    
    setErrors(newErrors);
    return isValid;
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
        const { fullName, mobileNumber, email, password } = formData;
        onRegister({ fullName, mobileNumber, email, password });
    }
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
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="John Doe" className="w-full mt-1 p-3 border border-light-300 dark:border-dark-700 bg-light-200 dark:bg-dark-800 text-gray-800 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
            {errors.fullName && <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Mobile Number</label>
            <input type="tel" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} placeholder="+91 12345 67890" className="w-full mt-1 p-3 border border-light-300 dark:border-dark-700 bg-light-200 dark:bg-dark-800 text-gray-800 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
            {errors.mobileNumber && <p className="text-xs text-red-500 mt-1">{errors.mobileNumber}</p>}
          </div>
           <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Email ID</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" className="w-full mt-1 p-3 border border-light-300 dark:border-dark-700 bg-light-200 dark:bg-dark-800 text-gray-800 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
            {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email}</p>}
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Create a strong password" className="w-full mt-1 p-3 border border-light-300 dark:border-dark-700 bg-light-200 dark:bg-dark-800 text-gray-800 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
            {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password}</p>}
          </div>
           <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Confirm Password</label>
            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="Re-enter your password" className="w-full mt-1 p-3 border border-light-300 dark:border-dark-700 bg-light-200 dark:bg-dark-800 text-gray-800 dark:text-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none" />
            {errors.confirmPassword && <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>}
          </div>
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