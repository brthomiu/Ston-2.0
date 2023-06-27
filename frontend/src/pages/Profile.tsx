import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { syncProfile, getUserProfile } from '../features/auth/authService';

function Profile() {
  const { isAuthenticated } = useAuth0(); // Initialize authentication
  const navigate = useNavigate(); // Initialize navigate

  const [userProfileData, setUserProfileData] = useState({
    _id: '',
    description: '',
    email: '',
    favorites: [],
    name: '',
    private: false,
    recipes: [],
    userId: 'noUser',
  });

  // Redirect unauthenticated users back to home
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      toast('Please login to see recipes.');
    }
  }, [isAuthenticated, navigate]);

  // Sync user auth data with MongoDB
  useEffect(() => {
    syncProfile();
  }, []);

  // Get user profile data from MongoDB
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await getUserProfile();
        setUserProfileData(userProfile);
      } catch (error) {
        // Handle error if necessary
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <>
      <h1>Profile</h1>
      <h2>Name: {userProfileData.name}</h2>
      <h2>Description: {userProfileData.description}</h2>
      <h2>Recipes: {userProfileData.recipes}</h2>
      <h2>Favorites: {userProfileData.favorites}</h2>
    </>
  );
}

export default Profile;
