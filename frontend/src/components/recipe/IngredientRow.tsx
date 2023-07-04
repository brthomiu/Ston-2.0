import { IIngredients } from '../../types/recipeTypes';

function IngredientRow({ ingredient }: { ingredient: IIngredients }) {
  return (
    <>
      <p>{ingredient.ingredient}</p>
      <p>{ingredient.amount}</p>
      <p>{ingredient.uom}</p>
    </>
  );
}

export default IngredientRow;
