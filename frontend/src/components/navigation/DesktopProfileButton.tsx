import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

function DesktopProfileButton() {
  const { isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <div className="flex flex-col pb-4">
        <Link className="link" to="/profile">
          Profile
        </Link>
      </div>
    )
  );
}

export default DesktopProfileButton;
