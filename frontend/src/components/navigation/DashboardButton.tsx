import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export default function DashboardButton() {
  const { isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <Link className="link" to="/dashboard">
        Dashboard
      </Link>
    )
  );
}
