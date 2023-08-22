import { useState } from 'react';
import {
  createUserRequestObject,
  handleDeleteRecipe,
} from '../../features/recipeService';
import { IRecipe, IUserAndRecipe } from '../../types/recipeTypes';
import { toggleReload, useReload } from '../../helpers/reload';

type Props = {
  recipe: IRecipe;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function ConfirmRecipeDeletion({
  recipe,
  setShowModal,
  setShowConfirmation,
}: Props) {
  // State for component reload
  const [reload, setReload] = useState(false);

  // Hook to reload when triggered
  useReload(reload);

  // Function to delete recipe and close the modal
  const deleteRecipe = async (userAndRecipe: IUserAndRecipe) => {
    try {
      handleDeleteRecipe(userAndRecipe);
      setShowConfirmation(false);
      setShowModal(false);
      toggleReload(reload, setReload);
    } catch (error) {
      throw Error('Could not delete recipe');
    }
  };

  const recipeData: IUserAndRecipe = {
    recipe,
    user: createUserRequestObject(),
  };

  return (
    <>
      <p>
        Are you sure you want to delete this recipe? There will be no going
        back!
      </p>
      <button type="button" onClick={() => setShowConfirmation(false)}>
        Go Back
      </button>
      <button type="button" onClick={() => deleteRecipe(recipeData)}>
        Delete
      </button>
    </>
  );
}
