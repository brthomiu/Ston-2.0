import { IIngredients } from '../../../types/recipeTypes';

function IngredientRow({
  ingredient,
  removeIngredient,
}: {
  ingredient: IIngredients;
  removeIngredient: (ingredient: IIngredients) => void;
}) {
  // Return ingredient component
  return (
    <div className="flex flex-row">
      <p>{ingredient.ingredient}</p>
      <p>{ingredient.amount}</p>
      <p>{ingredient.uom}</p>

      {/* Button to remove current ingredientObject from ingredientList */}
      <button type="button" onClick={() => removeIngredient(ingredient)}>
        X
      </button>
    </div>
  );
}

export default IngredientRow;
