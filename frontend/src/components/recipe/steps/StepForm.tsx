import { IRecipeProps } from '../../../types/recipeTypes';

function StepForm({
  step,
  setStepObject,
}: {
  step: string;
  setStepObject: IRecipeProps['setStepObject'];
}) {
  // Function to handle form input
  const onStepInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStepObject((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  // Return Step input forms
  return (
    <>
      {/* Step body input */}
      <span className="mt-8 mb-4 text-ston-brown self-start font-bold text-xl">
        Add Steps
      </span>
      <textarea
        className="bg-ston-tan text-ston-brown text-xl p-2 rounded-lg"
        maxLength={400}
        rows={1}
        cols={29}
        name="step"
        value={step}
        placeholder="Enter a step"
        onChange={onStepInput}
      />
    </>
  );
}

export default StepForm;
