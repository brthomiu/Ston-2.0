import { Link } from 'react-router-dom';

function RecipesButton() {
  return (
    <Link className="link" to="/recipes">
      Recipes
    </Link>
  );
}

export default RecipesButton;
