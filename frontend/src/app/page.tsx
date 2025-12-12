// /frontend/src/app/page.tsx

'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';

/**
 * This component acts as the root index page.
 * It redirects authenticated users to the dashboard and unauthenticated users to the login page.
 */
export default function HomePage() {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading) {
      if (token) {
        // If authenticated, go to the protected dashboard
        router.replace('/dashboard');
      } else {
        // If not authenticated, go to the login page
        router.replace('/login');
      }
    }
  }, [token, loading, router]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <p className="text-xl text-gray-600">Loading application...</p>
    </div>
  );
}