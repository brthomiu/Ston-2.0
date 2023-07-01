/* eslint-disable import/no-named-as-default */
import useFetchRecipes from '../hooks/recipeHooks';
import Loader from '../components/Loader';
import RecipeCard from '../components/recipe/RecipeCard';

function Recipes() {
  // Fetch recipe data
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
    <>
      <h1>Recipes</h1>
      {recipeData.map((recipe) => (
        <RecipeCard recipe={recipe} key={recipe.recipeName} />
      ))}
    </>
  );
}

export default Recipes;
