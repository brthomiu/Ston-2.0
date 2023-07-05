import { TagProps } from '../../../types/recipeTypes';

function TagRow({ tag }: TagProps) {
  // Render the ingredient
  return (
    <>
      <p>{tag}</p>
      <button type="button">X</button>
    </>
  );
}

export default TagRow;
