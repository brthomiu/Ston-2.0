import { Link } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export default function DashboardButton() {
  const { isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <div className="flex flex-col border-b-2 pb-4 border-ston-green lg:border-none">
        <Link className="link" to="/dashboard">
          Dashboard
        </Link>
      </div>
    )
  );
}
