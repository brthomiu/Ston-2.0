import { IIngredientProps, IIngredients } from '../../../types/recipeTypes';

function IngredientForm({
  ingredient,
  amount,
  // uom,
  ingredientObject,
  setIngredientObject,
}: {
  ingredient: string;
  amount: string;
  uom: string;
  ingredientObject: IIngredients;
  setIngredientObject: IIngredientProps['setIngredientObject'];
}) {
  // Function to handle form input - Any input
  const onIngredientInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIngredientObject((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  // Function to handle form input - Numbers only
  const onNumberInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    // Validation to make sure user can only enter numbers
    const digits = ['', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    if (digits.includes(event.target.value.slice(-1))) {
      setIngredientObject((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value,
      }));
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    setIngredientObject(() => ({
      ...ingredientObject,
      uom: value,
    }));
  };

  const uomOptions = [
    'each',
    'g',
    'L',
    'ml',
    'lb',
    'oz',
    'cup',
    'tbsp',
    'tsp',
    'pinch',
  ];

  // Return ingredient input forms
  return (
    <>
      <span className="my-4 text-ston-brown font-bold text-xl">
        Ingredients
      </span>
      {/* Ingredient name input */}
      <textarea
        className="mb-4 bg-ston-tan text-ston-brown text-xl p-2 rounded-lg"
        maxLength={40}
        rows={1}
        cols={29}
        name="ingredient"
        value={ingredient}
        placeholder="Ingredient Name"
        onChange={onIngredientInput}
      />
      <div className="flex flex-row items-end gap-4 m-auto">
        {/* Ingredient amount input */}
        <span className="text-ston-brown text-xl mx-2">Amount:</span>
        <textarea
          className="p-2 text-ston-brown bg-ston-tan rounded-lg"
          maxLength={20}
          rows={1}
          cols={2}
          name="amount"
          value={amount}
          placeholder=""
          onChange={onNumberInput}
        />

        {/* Ingredient unit of measure input */}
        <span className="text-ston-brown text-xl mx-2">Hours:</span>

        <select
          className="p-2 bg-ston-tan text-ston-brown rounded-lg"
          name="uom"
          value={ingredientObject.uom}
          onChange={handleChange}
        >
          <option value="" disabled>
            Unit
          </option>
          {uomOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}

export default IngredientForm;
