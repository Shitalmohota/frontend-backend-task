// /frontend/src/app/register/page.tsx

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import authService from '../../api/authService';
import Link from 'next/link';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [clientErrors, setClientErrors] = useState<{ [key: string]: string }>({});
  const [serverError, setServerError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!name.trim()) errors.name = 'Name is required.';
    if (!email.trim()) errors.email = 'Email is required.';
    if (password.length < 6) errors.password = 'Password must be at least 6 characters.';
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
      const data = await authService.register({ name, email, password });
      
      // Save JWT in localStorage via AuthContext and redirect to dashboard
      login(data.token, { _id: data._id, name: data.name, email: data.email });
      router.push('/dashboard');
    } catch (err: any) {
      // Handle Server-side Validation/Errors
      const message = err.response?.data?.message || 'Registration failed due to server error.';
      setServerError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center text-indigo-600">Create Account</h2>
        {serverError && <p className="text-red-500 text-center border p-2 rounded bg-red-50">{serverError}</p>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <input 
              type="text" 
              placeholder="Name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className={`w-full px-4 py-2 border rounded-lg ${clientErrors.name ? 'border-red-500' : 'focus:border-indigo-500'}`}
              disabled={isLoading}
            />
            {clientErrors.name && <p className="text-red-500 text-sm mt-1">{clientErrors.name}</p>}
          </div>

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
              placeholder="Password (min 6 chars)" 
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
            {isLoading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p className="text-center text-sm">
          Already have an account? <Link href="/login" className="text-indigo-600 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}