/* eslint-disable no-console */
/* eslint-disable import/no-named-as-default */
import useFetchRecipes from '../hooks/recipeHooks';
import Loader from '../components/Loader';
import RecipeCard from '../components/recipe/RecipeCard';
import { useIntroduction } from '../hooks/authHooks';

function Recipes() {
  // Redirects new users to intro page
  useIntroduction();

  // Fetch and render recipe data
  const recipeData = useFetchRecipes();

  // Returns loading until recipe data loads
  if (!recipeData || recipeData.length === 0) {
    return (
      <>
        <h1>Recipes</h1>
        <Loader />
      </>
    );
  }

  // Return recipes.
  return (
    <div className="mt-28">
      <h2>Recipes</h2>
      <div className="flex flex-col mt-12 gap-12 lg:grid lg:grid-cols-3">
        {recipeData.map((recipe) => (
          <RecipeCard recipe={recipe} key={recipe.recipeId} />
        ))}
      </div>
    </div>
  );
}

export default Recipes;
