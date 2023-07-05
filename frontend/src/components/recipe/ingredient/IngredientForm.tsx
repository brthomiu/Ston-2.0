import { IIngredientProps } from '../../../types/recipeTypes';

function IngredientForm({
  ingredient,
  amount,
  uom,
  setIngredientObject,
}: {
  ingredient: string;
  amount: string;
  uom: string;
  setIngredientObject: IIngredientProps['setIngredientObject'];
}) {
  // Function to handle form input
  const onIngredientInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIngredientObject((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

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
      <textarea
        maxLength={20}
        rows={1}
        cols={12}
        name="uom"
        value={uom}
        placeholder="Unit of Measure"
        onChange={onIngredientInput}
      />
    </>
  );
}

export default IngredientForm;
