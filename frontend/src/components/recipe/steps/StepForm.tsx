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
      <br />
      {/* Step body input */}
      <textarea
        maxLength={40}
        rows={1}
        cols={32}
        name="step"
        value={step}
        placeholder="Enter a step"
        onChange={onStepInput}
      />
    </>
  );
}

export default StepForm;
