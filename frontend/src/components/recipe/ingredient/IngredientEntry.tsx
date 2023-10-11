import { useState } from 'react';
import { toast } from 'react-hot-toast';
import IngredientRow from './IngredientRow';
import IngredientForm from './IngredientForm';
import { IIngredients, IRecipeProps } from '../../../types/recipeTypes';

function IngredientEntry({
  ingredientList,
  setIngredientList,
}: {
  ingredientList: IIngredients[];
  setIngredientList: IRecipeProps['setIngredientList'];
}) {
  // Empty ingredient object to be used as default state
  const defaultIngredientObject = {
    ingredient: '',
    amount: '',
    uom: '',
  };

  // State to hold ingredient object input
  const [ingredientObject, setIngredientObject] = useState<IIngredients>(
    defaultIngredientObject
  );

  // addIngredient
  // Pushes ingredientObject to ingredientList and resets ingredientObject
  const addIngredient = async () => {
    // Input validation to prevent blank ingredient fields
    if (
      !ingredientObject.ingredient ||
      !ingredientObject.amount ||
      !ingredientObject.uom
    ) {
      toast('Please complete all fields.');
    } else {
      const ingredientObjectData = {
        ingredient: ingredientObject.ingredient,
        amount: ingredientObject.amount,
        uom: ingredientObject.uom,
      };

      const newIngredientList = [...ingredientList, ingredientObjectData];
      setIngredientList(newIngredientList);
      setIngredientObject(defaultIngredientObject);
    }
  };

  // removeIngredient
  // Removes entry from ingredientList
  const removeIngredient = (ingredient: IIngredients) => {
    const index = ingredientList.indexOf(ingredient);
    const newIngredientList = [...ingredientList];
    newIngredientList.splice(index, 1);
    setIngredientList(newIngredientList);
  };

  // Return ingredient entry components
  return (
    <div className="flex flex-col justify-center">
      {/* Map ingredientList to row components */}
      {ingredientList.length > 0 && (
        <div className="grid mb-2 grid-cols-4 align-top h-fit items-center text-ston-brown">
          <p>Name</p>
          <p>Amount</p>
          <p>Unit</p>
          <p>Delete</p>
        </div>
      )}
      {ingredientList.map((ingredient) => (
        <IngredientRow
          ingredient={ingredient}
          removeIngredient={removeIngredient}
          key={ingredient.ingredient + Date.now()}
        />
      ))}

      {/* Ingredient form component */}
      <IngredientForm
        ingredient={ingredientObject.ingredient}
        amount={ingredientObject.amount}
        uom={ingredientObject.uom}
        ingredientObject={ingredientObject}
        setIngredientObject={setIngredientObject}
      />

      {/* Button to add current ingredientObject to ingredientList */}
      <br />
      <button
        className="bg-ston-green font-bold my-6 w-48 self-center"
        type="button"
        onClick={() => addIngredient()}
      >
        Add Ingredient
      </button>
    </div>
  );
}

export default IngredientEntry;
