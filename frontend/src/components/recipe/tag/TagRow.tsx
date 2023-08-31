function TagRow({
  tag,
  removeTag,
}: {
  tag: string;
  removeTag: (tag: string) => void;
}) {
  // Render the ingredient
  return (
    <div className="flex flex-row justify-between px-4 mb-2 w-[350px] self-center align-top h-fit items-center text-ston-brown bg-ston-yellow1 border rounded-lg">
      <p>{tag}</p>
      <button
        className="font-bold scale-125 text-red-700"
        type="button"
        onClick={() => removeTag(tag)}
      >
        X
      </button>
    </div>
  );
}

export default TagRow;
