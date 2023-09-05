import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

function RecipesButton() {
  const { isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <div className="flex flex-col border-b-2 pb-4 border-ston-green lg:border-none">
        <Link className="link" to="/recipes">
          Recipes
        </Link>
      </div>
    )
  );
}

export default RecipesButton;
