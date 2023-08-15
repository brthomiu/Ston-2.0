/* eslint-disable no-underscore-dangle */
/* eslint-disable no-console */
import axios from 'axios';
import { User } from '@auth0/auth0-react';

const API_URL = process.env.VITE_API_URL || 'http://localhost:8000/';

// getUserProfile
// POST:/api/user/profile - Gets user profile data
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
// POST:/api/user/recipes - Gets user recipe data
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
// POST:/api/user - Syncs user profile with MongoDB
export const syncProfile = async (user: User) => {
  if (!user.sub) {
    throw Error('Could not authenticate user.');
  }

  // Post user auth object to sync with database
  try {
    await axios.post(`${API_URL}api/user/`, user);
  } catch (error) {
    throw Error('Could not sync with database.');
  }

  // Place user data into local storage
  const userData = await getUserProfile(user);
  try {
    localStorage.setItem('_id', userData._id);
    localStorage.setItem('description', userData.description);
    localStorage.setItem('name', userData.name);
    localStorage.setItem('email', userData.email);
    localStorage.setItem('favorites', userData.favorites);
    localStorage.setItem('private', userData.private);
    localStorage.setItem('recipes', userData.recipes);
    localStorage.setItem('userId', userData.userId);
    localStorage.setItem('newUser', userData.newUser);
  } catch (error) {
    throw Error('Could not store user data');
  }
};

// endIntroduction
// POST:/api/user/intro
export const endIntroduction = async (userId: string) => {
  try {
    console.log('frontend userId: ', userId);
    await axios.post(`${API_URL}api/user/intro`, { userId });
    localStorage.setItem('newUser', 'false');
  } catch (error) {
    throw Error('Could not end introduction.');
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
