import { TagProps } from '../../types/recipeTypes';

function Ingredient({ tag }: TagProps) {
  // Render the ingredient
  return <p>{tag}</p>;
}

export default Ingredient;
