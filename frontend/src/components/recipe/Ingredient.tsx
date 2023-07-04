import { IngredientProps } from '../../types/recipeTypes';

function Ingredient({ ingredient }: IngredientProps) {
  // Render the ingredient
  return (
    <>
      <p>Ingredient: {ingredient.ingredient}</p>
      <p>Amount: {ingredient.amount}</p>
      <p>Unit of Measure: {ingredient.uom}</p>
    </>
  );
}

export default Ingredient;
