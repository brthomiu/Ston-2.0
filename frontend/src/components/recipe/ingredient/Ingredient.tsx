import { IngredientProps } from '../../../types/recipeTypes';

function Ingredient({ ingredient }: IngredientProps) {
  // Render the ingredient
  return (
    <div className="grid grid-cols-3 border-b border-ston-yellow2 my-1">
      <p>{ingredient.ingredient}</p>
      <p>{ingredient.amount}</p>
      <p>{ingredient.uom}</p>
    </div>
  );
}

export default Ingredient;
