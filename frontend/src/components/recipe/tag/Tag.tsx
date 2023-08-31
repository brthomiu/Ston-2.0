import { TagProps } from '../../../types/recipeTypes';

function Tag({ tag }: TagProps) {
  // Render the ingredient
  return <p>#{tag}</p>;
}

export default Tag;
