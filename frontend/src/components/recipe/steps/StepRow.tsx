import { IRecipeSteps } from '../../../types/recipeTypes';

function StepRow({
  step,
  removeStep,
}: {
  step: IRecipeSteps;
  removeStep: (step: IRecipeSteps) => void;
}) {
  // Return ingredient component
  return (
    <>
      <p>{step.step}</p>

      {/* Button to remove current stepObject from stepList */}
      <button type="button" onClick={() => removeStep(step)}>
        X
      </button>
    </>
  );
}

export default StepRow;
