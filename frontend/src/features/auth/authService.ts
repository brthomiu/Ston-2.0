/* eslint-disable no-console */
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/user/';

// Interface for user authentication data
export interface IUserAuthData {
  data: {
    userId: string;
    name: string;
    email: string;
  };
}

// Interface for user data being retrieved from MongoDB
export interface IUserDBData {
  _id: string;
  description: string;
  email: string;
  favorites: string[];
  name: string;
  private: boolean;
  recipes: string[];
  userId: string;
}

// Sync user profile with MongoDB
export const syncProfile = async () => {
  // Get user auth object from backend
  const userData: IUserAuthData = await axios.get(API_URL);
  if (!userData.data.userId) {
    throw Error('Could not authenticate user.');
  }

  // Post user auth object to sync with database
  const response = await axios.post(API_URL, userData.data);

  console.log(`Client login function response: ${response.data}`);
};

// Get user profile data
export const getUserProfile = async () => {
  // Get user auth object from backend
  const userAuthData: IUserAuthData = await axios.get(API_URL);
  if (!userAuthData.data.userId) {
    throw Error('Could not authenticate user.');
  }

  // Request user profile data from backend
  const response = await axios.get(`${API_URL}profile`);
  console.log('response.data: ', response.data[0]);
  // Return user profile data
  if (!response.data[0]) {
    throw Error('Error retrieving user profile data');
  }
  return response.data[0];
};
