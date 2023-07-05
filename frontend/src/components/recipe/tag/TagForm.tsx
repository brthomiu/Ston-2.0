import { TagObjectProps } from '../../../types/recipeTypes';

function TagForm({
  tagObject,
  setTagObject,
}: {
  tagObject: string;
  setTagObject: TagObjectProps['setTagObject'];
}) {
  // Function to handle form input
  const onTagInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = event.target.value;
    setTagObject(newValue);
  };

  // Return form for tag input
  return (
    <>
      <br />
      <textarea
        maxLength={20}
        rows={1}
        cols={20}
        name="tags"
        value={tagObject}
        placeholder="Enter tag"
        onChange={onTagInput}
      />
    </>
  );
}

export default TagForm;
