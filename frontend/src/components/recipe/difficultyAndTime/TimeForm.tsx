import { IRecipeTime, IRecipeProps } from '../../../types/recipeTypes';

function TimeForm({
  timeObject,
  setTimeObject,
}: // uom,
{
  timeObject: IRecipeTime;
  setTimeObject: IRecipeProps['setTimeObject'];
}) {
  // Function to handle form input
  const onInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Validation to make sure user can only enter numbers
    const digits = ['', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    if (digits.includes(event.target.value.slice(-1))) {
      setTimeObject((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setTimeObject(() => ({
      ...timeObject,
      minutes: value,
    }));
  };

  const minuteOptions = ['0', '15', '30', '45'];

  // Return ingredient input forms
  return (
    <>
      <br />
      {/* Hours */}
      <textarea
        maxLength={40}
        rows={1}
        cols={32}
        name="hours"
        value={timeObject.hours}
        placeholder="Ingredient Name"
        onChange={onInput}
      />

      {/* Ingredient unit of measure input */}
      <select name="minutes" value={timeObject.minutes} onChange={handleChange}>
        <option value="" disabled>
          Select Minutes
        </option>
        {minuteOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}

export default TimeForm;
