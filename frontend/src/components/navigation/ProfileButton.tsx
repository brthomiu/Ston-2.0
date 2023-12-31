import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

function ProfileButton() {
  const { isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <div className="flex flex-col border-b pb-4 border-ston-yellow1">
        <Link className="link" to="/profile">
          Profile
        </Link>
      </div>
    )
  );
}

export default ProfileButton;
