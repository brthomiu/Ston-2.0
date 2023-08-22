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
  if (showModal) {
    return (
      <div>
        <DeleteRecipeButton recipe={recipe} setShowModal={setShowModal} />
      </div>
    );
  }
}
