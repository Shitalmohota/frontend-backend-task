// /frontend/src/app/layout.tsx

import './globals.css';
import { AuthProvider } from '../context/AuthContext'; // 1. Import the AuthProvider

// Next.js metadata (optional, but good practice)
export const metadata = {
  title: 'Task Manager App',
  description: 'Full-stack task management application with Next.js and Express.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/*
        2. CRITICAL STEP: Wrap the body content with the AuthProvider.
        This makes the useAuth() hook available to all components within {children}.
      */}
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}