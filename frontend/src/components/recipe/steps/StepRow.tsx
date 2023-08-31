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
    <div className="flex flex-row justify-between px-4 mb-2 w-[350px] self-center align-top h-fit items-center text-ston-brown bg-ston-yellow1 border rounded-lg">
      <p>{step.step}</p>

      {/* Button to remove current stepObject from stepList */}
      <button
        className="font-bold scale-125 text-red-700"
        type="button"
        onClick={() => removeStep(step)}
      >
        X
      </button>
    </div>
  );
}

export default StepRow;
