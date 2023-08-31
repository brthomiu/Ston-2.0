/* eslint-disable no-console */
/* eslint-disable react/jsx-no-useless-fragment */
import { IRecipeSteps } from '../../../types/recipeTypes';

function Step({ step }: IRecipeSteps) {
  // Render the ingredient
  return (
    <>
      <p>{step}</p>
    </>
  );
}

export default Step;
