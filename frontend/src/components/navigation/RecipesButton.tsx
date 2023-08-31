import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

function RecipesButton() {
  const { isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <Link className="link" to="/recipes">
        Recipes
      </Link>
    )
  );
}

export default RecipesButton;
