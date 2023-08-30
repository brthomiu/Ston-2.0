import { IIngredients } from '../../../types/recipeTypes';
import Ingredient from './Ingredient';

function IngredientCloud({ ingredients }: { ingredients: IIngredients[] }) {
  // Render the ingredient cloud component
  return (
    <>
      <h3>Ingredients</h3>
      {ingredients.map((ingredient) => (
        <Ingredient ingredient={ingredient} key={ingredient.ingredient} />
      ))}
    </>
  );
}

export default IngredientCloud;
