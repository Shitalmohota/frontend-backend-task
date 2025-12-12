// /frontend/src/app/api/userService.ts

import axios from 'axios';

// IMPORTANT: Use the URL where your backend is running
const API_URL = 'http://localhost:5000/api/users/profile';

// Types matching the protected profile endpoint requests/responses

interface UpdateProfileData {
    name?: string;
    email?: string;
    // Password update is handled separately/optional but the API accepts it
    password?: string; 
}

interface UserProfile {
    _id: string;
    name: string;
    email: string;
    token?: string; // Returned if password is changed
    createdAt?: string;
}

/**
 * Fetches the current logged-in user's profile data.
 * The JWT token is automatically included via Axios default headers set in AuthContext.
 */
const getProfile = async (): Promise<UserProfile> => {
    const response = await axios.get(API_URL);
    return response.data;
};

/**
 * Updates the user's profile information (name, email, or password).
 */
const updateProfile = async (userData: UpdateProfileData): Promise<UserProfile> => {
    const response = await axios.put(API_URL, userData);
    return response.data;
};

const userService = {
    getProfile,
    updateProfile,
};

export default userService;