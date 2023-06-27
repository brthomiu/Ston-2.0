import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { syncProfile } from '../features/auth/authService';

function Home() {
  // Initialize authentication
  const { isAuthenticated } = useAuth0(); // Initialize authentication

  // Sync user profile data to MongoDB if logged in
  useEffect(() => {
    if (isAuthenticated) {
      syncProfile();
    }
  }, [isAuthenticated]);

  return (
    <div>
      <h1>Howdy planet.</h1>
    </div>
  );
}

export default Home;
