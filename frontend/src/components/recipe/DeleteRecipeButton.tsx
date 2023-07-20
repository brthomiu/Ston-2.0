import { handleDeleteRecipe } from '../../features/recipeService';

type Props = { recipeId: string };

export default function DeleteRecipeButton({ recipeId }: Props) {
  return (
    <button type="button" onClick={() => handleDeleteRecipe(recipeId)}>
      Delete Recipe
    </button>
  );
}
