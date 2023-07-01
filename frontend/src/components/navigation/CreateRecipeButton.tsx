import { useAuth0 } from '@auth0/auth0-react';
import { Link } from 'react-router-dom';

function CreateRecipeButton() {
  const { isAuthenticated } = useAuth0();

  return (
    isAuthenticated && (
      <Link className="link" to="/create">
        New Recipe
      </Link>
    )
  );
}

export default CreateRecipeButton;
