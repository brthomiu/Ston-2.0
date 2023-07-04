/* eslint-disable no-console */
import { IIngredientProps } from '../../types/recipeTypes';

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

  return (
    <>
      <h2>INGREDIENT FORM</h2>
      <textarea
        maxLength={20}
        rows={1}
        cols={20}
        name="ingredient"
        value={ingredient}
        placeholder="Ingredient Name"
        onChange={onIngredientInput}
      />
      <textarea
        maxLength={20}
        rows={1}
        cols={20}
        name="amount"
        value={amount}
        placeholder="Ingredient Amount"
        onChange={onIngredientInput}
      />
      <textarea
        maxLength={20}
        rows={1}
        cols={20}
        name="uom"
        value={uom}
        placeholder="Unit of Measure"
        onChange={onIngredientInput}
      />
    </>
  );
}

export default IngredientForm;
