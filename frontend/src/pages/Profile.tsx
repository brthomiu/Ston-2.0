import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { syncProfile } from '../features/auth/authService';

function Profile() {
  const { isAuthenticated } = useAuth0(); // Initialize authentication
  const navigate = useNavigate(); // Initialize navigate

  // Sync user profile data to mongoDB
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
      toast('Please login to see recipes.');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    syncProfile();
  }, []);
  return <h1>Profile</h1>;
}

export default Profile;
