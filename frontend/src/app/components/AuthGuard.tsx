

'use client';

import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, ReactNode } from 'react';

/**
 * A higher-order component (HOC) used to protect routes.
 * Redirects to /login if the user is not authenticated (no token).
 */
const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { token, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Wait until the initial loading state (checking localStorage) is complete
    if (!loading) {
      if (!token) {
        // If no token is found, redirect to the login page.
        // router.replace prevents the user from navigating back to the protected route via the browser back button.
        router.replace('/login');
      }
    }
  }, [token, loading, router]);

  // While checking status or if unauthenticated, show a loading placeholder
  if (loading || !token) {
    // Only show "Loading" if we are still checking OR if we know we are unauthorized
    // (though the router.replace will handle the redirect quickly)
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <p className="text-gray-600 text-lg">Checking authentication status...</p>
      </div>
    );
  }

  // If loading is false and token is present, allow access to the protected content
  return <>{children}</>;
};

export default AuthGuard;