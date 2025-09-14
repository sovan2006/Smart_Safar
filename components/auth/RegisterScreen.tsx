import React, { useState } from 'react';

interface RegisterScreenProps {
  onNavigateToLogin: () => void;
  onRegister: (userData: {email: string, password: string}) => void;
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
    onRegister({ email, password });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6">
        <div className="text-center">
            <h1 className="text-3xl font-bold">Create Account</h1>
            <p className="text-gray-500">Join SmartSafar for a safer journey.</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="John Doe" className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Mobile Number</label>
            <input type="tel" value={mobileNumber} onChange={e => setMobileNumber(e.target.value)} placeholder="+91 12345 67890" className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none" />
          </div>
           <div>
            <label className="text-sm font-medium text-gray-700">Email ID</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Create a strong password" className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none" />
          </div>
           <div>
            <label className="text-sm font-medium text-gray-700">Confirm Password</label>
            <input type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Re-enter your password" className="w-full mt-1 p-3 border rounded-lg focus:ring-2 focus:ring-cyan-400 outline-none" />
          </div>
          {error && <p className="text-sm text-red-600 text-center">{error}</p>}
          <button type="submit" className="w-full bg-cyan-500 text-white py-3 rounded-lg font-semibold transition-colors hover:bg-cyan-600">
            Register
          </button>
        </form>

        <div className="text-center text-sm text-gray-600">
          Already have an account? <button onClick={onNavigateToLogin} className="font-semibold text-cyan-600 hover:underline">Login</button>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
