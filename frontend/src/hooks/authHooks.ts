/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { User, useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { getUserProfile, syncProfile } from '../features/authService';

// useRedirect
// Redirect unauthenticated users back home
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

// useSyncProfile
// Sync user auth data with MongoDB
export const useSyncProfile = () => {
  const { user, isAuthenticated } = useAuth0();

  if (isAuthenticated && user) {
    console.log('user object: ', user);
    syncProfile(user);
  }
};

// useFetchProfile
// Get user profile data from MongoDB
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
