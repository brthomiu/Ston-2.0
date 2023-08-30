/* eslint-disable no-console */
import { IRecipeProps } from '../../../types/recipeTypes';

function DifficultyForm({
  difficultySelection,
  setDifficultySelection,
}: {
  difficultySelection: string;
  setDifficultySelection: IRecipeProps['setDifficultySelection'];
}) {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setDifficultySelection(value);
  };

  const difficultyOptions = ['Easy', 'Intermediate', 'Advanced'];

  // Return ingredient input forms
  return (
    <>
      {/* Ingredient unit of measure input */}
      <span className="mb-2 mt-6 text-ston-brown font-bold text-xl">
        Recipe Difficulty
      </span>
      <select
        className="p-2 w-[348px] bg-ston-tan rounded-lg text-ston-brown"
        name="difficultySelection"
        value={difficultySelection}
        onChange={handleChange}
      >
        <option value="" disabled>
          Select Difficulty of Recipe
        </option>
        {difficultyOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}

export default DifficultyForm;
