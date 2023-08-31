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
    <div className="grid grid-cols-4 mb-2 w-[350px] self-center align-top h-fit break-all items-center text-ston-brown bg-ston-yellow1 border rounded-lg">
      <p>{ingredient.ingredient}</p>
      <p>{ingredient.amount}</p>
      <p>{ingredient.uom}</p>

      {/* Button to remove current ingredientObject from ingredientList */}
      <button
        className="font-bold scale-125 text-red-700"
        type="button"
        onClick={() => removeIngredient(ingredient)}
      >
        X
      </button>
    </div>
  );
}

export default IngredientRow;
