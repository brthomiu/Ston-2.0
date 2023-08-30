import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';

export default function DashboardButton() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <button type="button" onClick={() => navigate('/dashboard')}>
        Dashboard
      </button>
    )
  );
}
