import axios from 'axios';

// IMPORTANT: Use the URL where your backend is running
const API_URL = 'http://localhost:5000/api/auth/';

// Types for request and response data
interface UserData {
  name?: string;
  email: string;
  password: string;
}

interface AuthResponse {
  _id: string;
  name: string;
  email: string;
  token: string;
}

const register = async (userData: UserData): Promise<AuthResponse> => {
  const response = await axios.post(API_URL + 'signup', userData);
  return response.data;
};

const login = async (userData: UserData): Promise<AuthResponse> => {
  const response = await axios.post(API_URL + 'login', userData);
  return response.data;
};

const authService = {
  register,
  login,
};

export default authService;