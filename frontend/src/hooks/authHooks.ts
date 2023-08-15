/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { User, useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {
  getUserProfile,
  getUserRecipes,
  syncProfile,
} from '../features/authService';

// useRedirect
// Redirects unauthenticated users back home
export const useRedirect = () => {
  // Initialize authentication
  const { isAuthenticated } = useAuth0(); // Initialize authentication
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      toast('Please login to see recipes.');
    }
  }, [isAuthenticated, navigate]);
};

// useIntroduction
// Sends new users to new user page on first login
export const useIntroduction = () => {
  const newUser = localStorage.getItem('newUser');
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    if (newUser === 'true') {
      navigate('/introduction');
    }
  });
};

// useNoIntroduction
// Sends users who are not new away from the intro page
export const useNoIntroduction = () => {
  const newUser = localStorage.getItem('newUser');
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    if (newUser === 'false') {
      navigate('/');
    }
  });
};

// useSyncProfile
// Syncs user auth data with MongoDB
export const useSyncProfile = () => {
  const { user, isAuthenticated } = useAuth0();

  if (isAuthenticated && user) {
    syncProfile(user);
  }
};

// useFetchProfile
// Gets user profile data from MongoDB
export const useFetchProfile = () => {
  const { user } = useAuth0();
  const [userProfileData, setUserProfileData] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        if (user) {
          const userData = await getUserProfile(user);
          setUserProfileData(userData);
        }
      } catch (error) {
        console.error('Error fetching user profile data:', error);
      }
    };

    fetchUserProfile();
  }, [user]);

  return userProfileData;
};

// useFetchProfileRecipes
// Gets user recipes from MongoDB
export const useFetchProfileRecipes = () => {
  const name = localStorage.getItem('name');
  console.log('username: ', name);
  const [userRecipeData, setUserRecipeData] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserRecipes = async () => {
      try {
        if (name) {
          const recipeData = await getUserRecipes(name);
          setUserRecipeData(recipeData);
        }
      } catch (error) {
        console.error('Error fetching user recipe data:', error);
      }
    };

    fetchUserRecipes();
  }, [name]);

  return userRecipeData;
};
