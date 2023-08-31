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
      <span className="mt-8 mb-4 text-ston-brown self-start font-bold text-xl">
        Add Tags
      </span>
      <textarea
        className="bg-ston-tan text-ston-brown text-xl p-2 rounded-lg"
        maxLength={32}
        rows={1}
        cols={29}
        name="tags"
        value={tagObject}
        placeholder="Enter tag"
        onChange={onTagInput}
      />
    </>
  );
}

export default TagForm;
