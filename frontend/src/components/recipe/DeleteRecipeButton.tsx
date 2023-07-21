/* eslint-disable no-console */
import { useState } from 'react';
import ConfirmDeletion from './ConfirmDeletion';

type Props = {
  recipeId: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  toggleReload: () => void;
};

export default function DeleteRecipeButton({
  recipeId,
  setShowModal,
  toggleReload,
}: Props) {
  // State to toggle the confirm deletion prompt
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Function to delete recipe and close the modal
  const toggleShowConfirmation = () => {
    if (!showConfirmation) {
      setShowConfirmation(true);
    } else {
      setShowConfirmation(false);
    }
  };

  if (showConfirmation) {
    return (
      <>
        <ConfirmDeletion
          recipeId={recipeId}
          setShowModal={setShowModal}
          setShowConfirmation={setShowConfirmation}
          toggleReload={toggleReload}
        />
        <button type="button" onClick={() => toggleShowConfirmation()}>
          Delete Recipe
        </button>
      </>
    );
  }

  return (
    <button type="button" onClick={() => toggleShowConfirmation()}>
      Delete Recipe
    </button>
  );
}
