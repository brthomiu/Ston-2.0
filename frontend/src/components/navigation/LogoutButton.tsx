import { useAuth0 } from '@auth0/auth0-react';

function LogoutButton() {
  const { logout, isAuthenticated } = useAuth0();

  // bigLogout
  // Clears session storage and logs out
  const bigLogout = () => {
    sessionStorage.clear();
    logout();
  };

  return (
    isAuthenticated && (
      <button type="button" onClick={() => bigLogout()}>
        Logout
      </button>
    )
  );
}

export default LogoutButton;
