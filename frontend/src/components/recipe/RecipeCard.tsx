import { IRecipe } from '../../types/recipeTypes';

interface RecipeCardProps {
  recipe: IRecipe;
}

function RecipeCard({ recipe }: RecipeCardProps) {
  // Render the recipe card component
  return (
    <>
      <h2>{recipe.recipeName}</h2>
      <p>{recipe.recipeBody}</p>
    </>
  );
}

export default RecipeCard;
