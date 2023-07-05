function TagRow({
  tag,
  removeTag,
}: {
  tag: string;
  removeTag: (tag: string) => void;
}) {
  // Render the ingredient
  return (
    <>
      <p>{tag}</p>
      <button type="button" onClick={() => removeTag(tag)}>
        X
      </button>
    </>
  );
}

export default TagRow;
