import { useState } from 'react';
import { IRecipe, TagProps } from '../../types/recipeTypes';
import IngredientCloud from './ingredient/IngredientCloud';
import TagCloud from './tag/TagCloud';
import RecipeModal from './RecipeModal';
import LikeRecipe from './LikeRecipe';

type Props = {
  recipe: IRecipe;
};

function RecipeCard({ recipe }: Props) {
  // State to toggle display of modal
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    if (!showModal) {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  // Convert recipe tags to TagProps[]
  const tags: TagProps[] = recipe.tags.map((tag) => ({ tag }));
  // Render the recipe card component
  return (
    <>
      <h2>{recipe.recipeName}</h2>
      <p>Instructions: {recipe.recipeBody}</p>
      <IngredientCloud ingredients={recipe.ingredients} />
      <TagCloud tags={tags} />
      <RecipeModal
        recipe={recipe}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <button onClick={() => toggleModal()} type="button">
        Show More
      </button>
      <LikeRecipe recipe={recipe} />
    </>
  );
}

export default RecipeCard;
