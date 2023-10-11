import { IIngredients } from '../../../types/recipeTypes';
import Ingredient from './Ingredient';

function IngredientCloud({ ingredients }: { ingredients: IIngredients[] }) {
  // Render the ingredient cloud component
  return (
    <div className="bg-ston-tan rounded-2xl">
      <div className="bg-ston-yellow2 grid grid-cols-3 font-bold">
        <p>Ingredient</p>
        <p>Amount</p>
        <p>Unit</p>
      </div>
      {ingredients.map((ingredient) => (
        <Ingredient
          ingredient={ingredient}
          key={ingredient.ingredient + Date.now()}
        />
      ))}
    </div>
  );
}

export default IngredientCloud;
