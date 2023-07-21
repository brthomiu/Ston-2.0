import { handleDeleteRecipe } from '../../features/recipeService';

type Props = {
  recipeId: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowConfirmation: React.Dispatch<React.SetStateAction<boolean>>;
  toggleReload: () => void;
};

export default function ConfirmDeletion({
  recipeId,
  setShowModal,
  setShowConfirmation,
  toggleReload,
}: Props) {
  // Function to delete recipe and close the modal
  const deleteRecipe = (id: string) => {
    try {
      handleDeleteRecipe(id);
      setShowConfirmation(false);
      setShowModal(false);
      toggleReload();
    } catch (error) {
      throw Error('Could not delete recipe');
    }
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
      <button type="button" onClick={() => deleteRecipe(recipeId)}>
        Delete
      </button>
    </>
  );
}
