// /frontend/src/app/components/ProfileSection.tsx

'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
// import userService from '../../api/userService'; // Note: This line is commented out/removed as the API logic is defined locally
import { useRouter } from 'next/navigation';

// CRITICAL FIX: IMPORT AXIOS
import axios from 'axios'; // <--- REQUIRED FOR THE updateProfile FUNCTION

// Interface matching the updatable fields
interface UserData {
    name: string;
    email: string;
}

// Minimal user service (required for updates)
const API_URL = 'http://localhost:5000/api/users/profile';

interface UpdateProfileData {
    name?: string;
    email?: string;
}

interface UserProfile {
    _id: string;
    name: string;
    email: string;
    token?: string;
}

const updateProfile = async (userData: UpdateProfileData): Promise<UserProfile> => {
    // Axios uses the token set in defaults by AuthContext
    const response = await axios.put(API_URL, userData); 
    return response.data;
};

export default function ProfileSection() {
    // ... (the rest of the component logic is correct)
    const { user, login, logout } = useAuth();
    const router = useRouter();
    
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<UserData>({
        name: user?.name || '',
        email: user?.email || '',
    });
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    // Ensure form data matches context user data initially
    useEffect(() => {
        if (user) {
            setFormData({ name: user.name, email: user.email });
        }
    }, [user]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setErrorMessage('');

        try {
            const updatedProfile = await updateProfile(formData);
            
            if (user) {
                login(localStorage.getItem('token')!, { 
                    ...user, 
                    name: updatedProfile.name, 
                    email: updatedProfile.email 
                });
            }

            setStatus('success');
            setIsEditing(false); 
            
        } catch (err: any) {
            const msg = err.response?.data?.message || 'Failed to update profile.';
            setErrorMessage(msg);
            setStatus('error');
        }
    };
    
    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-indigo-200">
            <h3 className="text-xl font-semibold text-indigo-700 mb-4 flex justify-between items-center">
                User Profile
                <div className="flex space-x-3">
                    <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="text-sm font-medium text-indigo-500 hover:text-indigo-700 transition"
                    >
                        {isEditing ? 'Cancel Edit' : 'Edit Profile'}
                    </button>
                    <button
                        onClick={handleLogout}
                        className="text-sm font-medium text-red-500 hover:text-red-700 transition"
                    >
                        Logout
                    </button>
                </div>
            </h3>

            {status === 'success' && <p className="text-green-600 mb-3">Profile updated successfully!</p>}
            {status === 'error' && <p className="text-red-500 mb-3">Error: {errorMessage}</p>}
            
            {isEditing ? (
                // --- Edit Form Mode ---
                <form onSubmit={handleSubmit} className="space-y-3">
                    {/* Input fields for Name and Email */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 focus:outline-none"
                    >
                        {status === 'loading' ? 'Saving...' : 'Save Changes'}
                    </button>
                </form>
            ) : (
                // --- View Mode ---
                <div className="space-y-2">
                    <p><strong>Name:</strong> {user?.name}</p>
                    <p><strong>Email:</strong> {user?.email}</p>
                </div>
            )}
        </div>
    );
}