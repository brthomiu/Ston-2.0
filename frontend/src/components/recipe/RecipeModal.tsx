import { IRecipe } from '../../types/recipeTypes';
import DeleteRecipeButton from './DeleteRecipeButton';

type Props = {
  recipe: IRecipe;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function RecipeModal({
  recipe,
  showModal,
  setShowModal,
}: Props) {
  // Get userName from local storage
  const userName = localStorage.getItem('name')! as string;

  if (showModal) {
    return (
      <div>
        <h1>Recipe Modal</h1>

        {/* Render the delete button only if the user is the owner of the recipe */}
        {userName === recipe.owner && (
          <DeleteRecipeButton recipe={recipe} setShowModal={setShowModal} />
        )}
      </div>
    );
  }
}
