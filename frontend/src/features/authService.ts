/* eslint-disable no-console */
import axios from 'axios';
import { User } from '@auth0/auth0-react';

const API_URL = 'http://localhost:8000/';

// syncProfile
// Syncs user profile with MongoDB
export const syncProfile = async (user: User) => {
  if (!user.sub) {
    throw Error('Could not authenticate user.');
  }

  // Post user auth object to sync with database
  try {
    await axios.post(`${API_URL}api/user/`, user);
    console.log(`Synced with database.`);
  } catch (error) {
    throw Error('Could not sync with database.');
  }
};

// getUserProfile
// Gets user profile data
export const getUserProfile = async (user: User) => {
  // Request user profile data from backend
  const response = await axios.post(`${API_URL}api/user/profile`, user);
  // Return user profile data
  if (!response.data[0]) {
    throw Error('Error retrieving user profile.');
  }
  return response.data[0];
};
