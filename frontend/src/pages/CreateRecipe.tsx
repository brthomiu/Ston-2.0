import { useRedirect } from '../hooks/authHooks';
import RecipeForms from '../components/recipe/RecipeForms';

function CreateRecipe() {
  // Redirect users who aren't logged in
  useRedirect();

  return (
    <>
      <h2>New Recipe</h2>
      <RecipeForms />
    </>
  );
}

export default CreateRecipe;
