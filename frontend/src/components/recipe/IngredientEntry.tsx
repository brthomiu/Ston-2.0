/* eslint-disable no-console */
import { useState } from 'react';
import IngredientRow from './IngredientRow';
import IngredientForm from './IngredientForm';
import { IIngredients } from '../../types/recipeTypes';

function IngredientEntry() {
  // State to hold ingredient list (added to recipe object on submit)
  const [ingredientList, setIngredientList] = useState<IIngredients[]>([]);
  // State to hold ingredient object (pushed to ingredientList on submit)
  const defaultIngredientObject = {
    ingredient: '',
    amount: '',
    uom: '',
  };
  const [ingredientObject, setIngredientObject] = useState<IIngredients>(
    defaultIngredientObject
  );

  // addIngredient
  // Pushes ingredientObject to ingredientList and resets ingredientObject
  const addIngredient = async () => {
    const ingredientObjectData = {
      ingredient: ingredientObject.ingredient,
      amount: ingredientObject.amount,
      uom: ingredientObject.uom,
    };

    const newIngredientList = [...ingredientList, ingredientObjectData];
    setIngredientList(newIngredientList);
    setIngredientObject(defaultIngredientObject);
  };

  return (
    <>
      {ingredientList.map((ingredient) => (
        <IngredientRow ingredient={ingredient} key={ingredient.ingredient} />
      ))}
      <IngredientForm
        ingredient={ingredientObject.ingredient}
        amount={ingredientObject.amount}
        uom={ingredientObject.uom}
        setIngredientObject={setIngredientObject}
      />
      <button type="button" onClick={() => addIngredient()}>
        Add Ingredient
      </button>
    </>
  );
}

export default IngredientEntry;
