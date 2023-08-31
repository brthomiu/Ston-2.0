import { useAuth0 } from '@auth0/auth0-react';

function LoginButton() {
  const { loginWithRedirect, isAuthenticated } = useAuth0();

  return (
    !isAuthenticated && (
      <button
        className="-translate-y-2 text-2xl"
        type="button"
        onClick={() => loginWithRedirect()}
      >
        Sign up now!
      </button>
    )
  );
}

export default LoginButton;
