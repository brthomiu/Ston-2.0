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
      {/* Hours */}
      <span className="mt-[72px] text-ston-brown font-bold text-xl">
        Recipe Length
      </span>
      <div className="flex flex-row mt-4 items-end gap-2">
        <span className="text-ston-brown text-xl mx-4">Hours:</span>
        <textarea
          className="bg-ston-tan text-ston-brown p-2 max-h-[38px] rounded-lg overflow-hidden"
          maxLength={2}
          rows={1}
          cols={2}
          name="hours"
          value={timeObject.hours}
          placeholder=""
          onChange={onInput}
        />

        {/* Ingredient unit of measure input */}
        <span className=" text-ston-brown ml-6 text-xl mx-4">Minutes:</span>
        <select
          className="p-2 w-12 bg-ston-tan text-ston-brown rounded-lg"
          name="minutes"
          value={timeObject.minutes}
          onChange={handleChange}
        >
          <option value="" disabled>
            Select Minutes
          </option>
          {minuteOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default TimeForm;
