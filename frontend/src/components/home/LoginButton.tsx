import { useAuth0 } from '@auth0/auth0-react';

function LoginButton() {
  const { loginWithRedirect } = useAuth0();

  return (
    <button
      className="w-72 mt-8 mb-8 mx-auto bg-ston-yellow1 text-ston-green text-3xl font-bold border-none"
      type="button"
      onClick={() => loginWithRedirect()}
    >
      Get Started
    </button>
  );
}

export default LoginButton;
