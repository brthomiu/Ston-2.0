/* eslint-disable no-plusplus */
import { IRecipeSteps } from '../../../types/recipeTypes';
import Step from './Step';

function StepCloud({ steps }: { steps: IRecipeSteps[] }) {
  // Render the ingredient cloud component
  return (
    <>
      <h2>Steps</h2>
      {steps.map((step) => (
        <Step step={step.step} key={step.step + Date.now()} />
      ))}
    </>
  );
}

export default StepCloud;
