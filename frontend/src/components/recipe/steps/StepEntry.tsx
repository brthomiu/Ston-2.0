import { useState } from 'react';
import { toast } from 'react-hot-toast';
import StepRow from './StepRow';
import StepForm from './StepForm';
import { IRecipeProps, IRecipeSteps } from '../../../types/recipeTypes';

function StepEntry({
  stepList,
  setStepList,
}: {
  stepList: IRecipeSteps[];
  setStepList: IRecipeProps['setStepList'];
}) {
  // Empty step object to be used as default state
  const defaultStepObject = {
    step: '',
  };

  // State to hold step object input
  const [stepObject, setStepObject] = useState<IRecipeSteps>(defaultStepObject);

  // addStep
  // Pushes to stepList and resets stepObject
  const addStep = async () => {
    // Input validation to prevent blank step fields
    if (!stepObject.step) {
      toast('Please complete all fields.');
    } else {
      const stepObjectData = {
        step: stepObject.step,
      };

      const newStepList = [...stepList, stepObjectData];
      setStepList(newStepList);
      setStepObject(defaultStepObject);
    }
  };

  // removeStep
  // Removes entry from stepList
  const removeStep = (step: IRecipeSteps) => {
    const index = stepList.indexOf(step);
    const newStepList = [...stepList];
    newStepList.splice(index, 1);
    setStepList(newStepList);
  };

  // Return step entry components
  return (
    <>
      {stepList.length > 0 && (
        <div className="flex flex-row justify-between pl-2 pr-4 mb-2 w-[350px] self-center align-top h-fit items-center text-ston-brown">
          <p>Step</p> <p>Delete</p>
        </div>
      )}
      {/* Map stepList to row components */}
      {stepList.map((step) => (
        <StepRow
          step={step}
          removeStep={removeStep}
          key={step.step + Date.now()}
        />
      ))}

      {/* Step form component */}
      <StepForm step={stepObject.step} setStepObject={setStepObject} />

      {/* Button to add current stepObject to stepList */}
      <button
        className="bg-ston-green font-bold my-6 w-48 self-center"
        type="button"
        onClick={() => addStep()}
      >
        Add Step
      </button>
    </>
  );
}

export default StepEntry;
