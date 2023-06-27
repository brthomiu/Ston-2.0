import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { syncProfile } from '../features/auth/authService';

function Recipes() {
  // Initialize authentication
  const { isAuthenticated } = useAuth0(); // Initialize authentication

  // Sync user profile data to MongoDB if logged in
  useEffect(() => {
    if (isAuthenticated) {
      syncProfile();
    }
  }, [isAuthenticated]);
  return <h1>Recipes</h1>;
}

export default Recipes;
