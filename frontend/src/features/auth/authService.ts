/* eslint-disable no-console */
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/users/';

// Interface for user data being handled by the client
export interface IUserData {
  userId: string;
  name: string;
  email: string;
}

// Login user
const login = async () => {
  // Get user auth object from backend
  const userData: IUserData = await axios.get(API_URL);
  console.log(`Client login function userData: ${JSON.stringify(userData)}`);
  if (!userData.userId) {
    throw Error('Could not authenticate user.');
  }

  // Post user auth object to sync with database
  const response = await axios.post(API_URL, userData);

  console.log(`Client login function response: ${response.data}`);

  // Place user auth object in local storage
  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

// Logout user
const logout = () => {
  // Remove auth object from local storage
  localStorage.removeItem('user');
};

const authService = {
  logout,
  login,
};

export default authService;
