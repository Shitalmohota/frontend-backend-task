
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import authService from '../../api/authService';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [clientErrors, setClientErrors] = useState<{ [key: string]: string }>({});
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!email.trim()) errors.email = 'Email is required.';
    if (!password) errors.password = 'Password is required.';
    setClientErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerError('');
    if (!validate()) {
      return;
    }

    setIsLoading(true);
    try {
      const data = await authService.login({ email, password });
      
      // Success: Save JWT and redirect.
      login(data.token, { _id: data._id, name: data.name, email: data.email });
      router.push('/dashboard');
    } catch (err: any) {
      // Handle Server-side Errors (e.g., Invalid credentials - status 401)
      const message = err.response?.data?.message || 'Login failed.';
      setServerError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-indigo-600">Sign In</h2>
        {serverError && <p className="text-red-500 text-center border p-2 rounded bg-red-50">{serverError}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input 
              type="email" 
              placeholder="Email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              className={`w-full px-4 py-2 border rounded-lg ${clientErrors.email ? 'border-red-500' : 'focus:border-indigo-500'}`}
              disabled={isLoading}
            />
            {clientErrors.email && <p className="text-red-500 text-sm mt-1">{clientErrors.email}</p>}
          </div>

          <div>
            <input 
              type="password" 
              placeholder="Password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              className={`w-full px-4 py-2 border rounded-lg ${clientErrors.password ? 'border-red-500' : 'focus:border-indigo-500'}`}
              disabled={isLoading}
            />
            {clientErrors.password && <p className="text-red-500 text-sm mt-1">{clientErrors.password}</p>}
          </div>

          <button 
            type="submit" 
            className="w-full py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition duration-200 disabled:bg-indigo-400"
            disabled={isLoading}
          >
            {isLoading ? 'Signing In...' : 'Login'}
          </button>
        </form>
        <p className="text-center text-sm">
          Don't have an account? <Link href="/register" className="text-indigo-600 hover:underline">Register</Link>
        </p>
      </div>
    </div>
  );
}