import { useNavigate } from 'react-router-dom';

function GuestButton() {
  const navigate = useNavigate();

  return (
    <button
      className="text-ston-yellow1 text-2xl border-none"
      type="button"
      onClick={() => navigate('/recipes')}
    >
      Browse Recipes as Guest
    </button>
  );
}

export default GuestButton;
