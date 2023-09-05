/* eslint-disable func-names */
import { useState } from 'react';
import { IRecipe, TagProps } from '../../types/recipeTypes';
import IngredientCloud from './ingredient/IngredientCloud';
import StepCloud from './steps/StepCloud';
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
      document.body.style.overflow = 'hidden';
      setShowModal(true);
    } else {
      document.body.style.overflow = 'revert';
      setShowModal(false);
    }
  };

  // Convert recipe tags to TagProps[]
  const tags: TagProps[] = recipe.tags.map((tag) => ({ tag }));
  // Render the recipe card component
  return (
    <div className="flex flex-col justify-between bg-ston-yellow1 text-ston-brown w-[320px] h-[320px] lg:w-[400px] lg:h-[400px] rounded-2xl">
      <h2 className="bg-ston-yellow2 rounded-t-2xl">{recipe.recipeName}</h2>
      <p>{recipe.description}</p>
      <IngredientCloud ingredients={recipe.ingredients} />
      <StepCloud steps={recipe.steps} />
      <TagCloud tags={tags} />
      <RecipeModal
        recipe={recipe}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <div className="flex flex-row p-2 justify-around bg-ston-yellow2 rounded-b-2xl">
        <button
          className="bg-ston-yellow1"
          onClick={() => toggleModal()}
          type="button"
        >
          Show More
        </button>
        <LikeRecipe recipe={recipe} />
      </div>
    </div>
  );
}

export default RecipeCard;
