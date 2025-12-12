
import AuthGuard from '../components/AuthGuard';
import ProfileSection from '../components/ProfileSection';
import TaskList from '../components/TaskList'; 
import Link from 'next/link';

export default function Dashboard() {
  return (
    <AuthGuard>
      <div className="min-h-screen bg-gray-50 p-4 sm:p-8">
        <div className="max-w-6xl mx-auto">
          <header className="flex justify-between items-center mb-8 border-b pb-4">
            <h1 className="text-4xl font-extrabold text-gray-800">Task Dashboard</h1>
            <Link 
              href="/profile" 
              className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition text-sm font-semibold"
            >
              View Profile Settings
            </Link>
          </header>
          
          {/* 1. User Profile Section (6.1) */}
          {/* Note: ProfileSection includes the Logout button */}
          <ProfileSection />

          {/* 2. Task Management Section (6.2) */}
          <div className="bg-white p-6 rounded-lg shadow-xl border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-700 mb-4 border-b pb-2">Your Task List</h2>
            <TaskList />
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}