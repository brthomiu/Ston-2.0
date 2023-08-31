import { useRedirect, useIntroduction } from '../hooks/authHooks';
import RecipeForms from '../components/recipe/RecipeForms';

function CreateRecipe() {
  // Redirect users who aren't logged in / new users
  useRedirect();
  useIntroduction();

  return (
    <div className="mt-28">
      <div className="absolute top-16 left-0 w-full lg:w-[600px] lg:relative">
        <h2 className="mt-10">New Recipe</h2>
        <div className="bg-ston-yellow2 rounded-2xl">
          <RecipeForms />
        </div>
      </div>
    </div>
  );
}

export default CreateRecipe;
