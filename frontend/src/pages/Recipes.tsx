/* eslint-disable import/no-named-as-default */
import { useRedirect } from '../hooks/authHooks';
import useFetchRecipes from '../hooks/recipeHooks';

// function Recipes() {
//   // Redirect users who aren't logged in
//   useRedirect();

//   // Fetch user profile data
//   const recipeData = useFetchRecipes();

//   // Returns loading until profile data loads
//   if (!recipeData) {
//     return (
//       <>
//         <h1>Recipes</h1>
//         <div>Loading...</div>
//       </>
//     );
//   }

//   // Return user profile.
//   return (
//     <>
//       <h1>Recipes</h1>
//       <h2>Name: {recipeData[0].recipeName}</h2>
//     </>
//   );
// }
function Recipes() {
  // Redirect users who aren't logged in
  useRedirect();

  // Fetch user profile data
  const recipeData = useFetchRecipes();

  // Returns loading until profile data loads
  if (!recipeData || recipeData.length === 0) {
    return (
      <>
        <h1>Recipes</h1>
        <div>Loading...</div>
      </>
    );
  }

  // Return user profile.
  return (
    <>
      <h1>Recipes</h1>
      {recipeData.map((recipe) => (
        <>
          <h2 key={recipe.recipeName}>Name: {recipe.recipeName}</h2>
          <h2 key={recipe.recipeName}>Body: {recipe.recipeBody}</h2>
        </>
      ))}
    </>
  );
}

export default Recipes;
