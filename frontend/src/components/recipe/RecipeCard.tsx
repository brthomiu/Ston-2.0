import { RecipeCardProps, TagProps } from '../../types/recipeTypes';
import IngredientCloud from './IngredientCloud';
import TagCloud from './TagCloud';

function RecipeCard({ recipe }: RecipeCardProps) {
  // Convert recipe tags to TagProps[]
  const tags: TagProps[] = recipe.tags.map((tag) => ({ tag }));
  // Render the recipe card component
  return (
    <>
      <h2>{recipe.recipeName}</h2>
      <p>Instructions: {recipe.recipeBody}</p>
      <IngredientCloud ingredients={recipe.ingredients} />
      <TagCloud tags={tags} />
    </>
  );
}

export default RecipeCard;
