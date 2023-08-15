/* eslint-disable no-console */
/* eslint-disable import/no-named-as-default */
import { useState } from 'react';
import useFetchRecipes from '../hooks/recipeHooks';
import Loader from '../components/Loader';
import RecipeCard from '../components/recipe/RecipeCard';
import { useIntroduction } from '../hooks/authHooks';

function Recipes() {
  // Redirects new users to intro page
  useIntroduction();

  // State to toggle reload of page when a recipe is changed or deleted
  const [reload, setReload] = useState(false);

  const toggleReload = () => {
    if (!reload) {
      setReload(true);
      console.log('toggled reload, now: ', reload);
    } else {
      setReload(false);
      console.log('toggled reload, now: ', reload);
    }
  };

  // Fetch recipe data
  const recipeData = useFetchRecipes(reload);

  // useEffect hook to re-render components when triggered
  // useEffect(() => {
  //   console.log('Reloaded page');
  // }, [reload]);

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
        <RecipeCard
          recipe={recipe}
          key={recipe.recipeName}
          toggleReload={toggleReload}
        />
      ))}
    </>
  );
}

export default Recipes;
