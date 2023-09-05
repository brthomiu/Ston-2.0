/* eslint-disable @typescript-eslint/no-non-null-assertion */
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

  const toggleModal = () => {
    if (!showModal) {
      document.body.style.overflow = 'hidden';
      setShowModal(true);
    } else {
      document.body.style.overflow = 'revert';
      setShowModal(false);
    }
  };

  if (showModal) {
    return (
      <div className="fixed left-[5%] top-[13.5%] w-[90%] h-[80%] bg-ston-yellow1">
        <h1>Recipe Modal</h1>
        <button onClick={() => toggleModal()} type="button">
          Close Modal
        </button>
        {/* Render the delete button only if the user is the owner of the recipe */}
        {userName === recipe.owner && (
          <DeleteRecipeButton recipe={recipe} setShowModal={setShowModal} />
        )}
      </div>
    );
  }
}
