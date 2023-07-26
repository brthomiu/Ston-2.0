/* eslint-disable no-console */
import axios from 'axios';
import { User } from '@auth0/auth0-react';

const API_URL = process.env.VITE_API_URL || 'http://localhost:8000/';

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

// getUserRecipes
// Gets user recipe data
export const getUserRecipes = async (name: string) => {
  // Request user profile data from backend
  console.log('nameInGetUserRecipes: ', name);
  const response = await axios.post(`${API_URL}api/user/recipes`, { name });
  // Return user profile data
  if (!response.data) {
    throw Error('Error retrieving user recipes.');
  }
  return response.data;
};

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

  // Place user data into sessionstorage
  const userData = await getUserProfile(user);
  try {
    sessionStorage.setItem('userName', userData.name);
    sessionStorage.setItem('email', userData.email);
  } catch (error) {
    throw Error('Could not store user data');
  }
};

// DISABLED UNTIL BACKEND CODE IS FINISHED
// // deleteAccount
// // Deletes the user's account from database and from Auth0
// export const deleteAccount = async (user: User) => {
//   // Delete user profile data
//   await axios.delete(`${API_URL}api/user/profile`, { data: user });
//   await axios.delete(`${API_URL}api/user`, { data: user });
// };
