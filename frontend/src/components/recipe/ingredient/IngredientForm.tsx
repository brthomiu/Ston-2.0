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
  // Function to handle form input
  const onIngredientInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIngredientObject((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
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
      <br />
      {/* Ingredient name input */}
      <textarea
        maxLength={40}
        rows={1}
        cols={32}
        name="ingredient"
        value={ingredient}
        placeholder="Ingredient Name"
        onChange={onIngredientInput}
      />

      {/* Ingredient amount input */}
      <textarea
        maxLength={20}
        rows={1}
        cols={12}
        name="amount"
        value={amount}
        placeholder="Ingredient Amount"
        onChange={onIngredientInput}
      />

      {/* Ingredient unit of measure input */}
      <select name="uom" value={ingredientObject.uom} onChange={handleChange}>
        <option value="" disabled>
          Select Unit of Measure
        </option>
        {uomOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}

export default IngredientForm;
