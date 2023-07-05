import { useState } from 'react';
import TagForm from './TagForm';
import { IRecipeProps } from '../../../types/recipeTypes';
import TagRow from './TagRow';

function TagEntry({
  tagList,
  setTagList,
}: {
  tagList: string[];
  setTagList: IRecipeProps['setTagList'];
}) {
  // State to hold tag input
  const [tagObject, setTagObject] = useState<string>('');

  // addTag
  // Pushes tagObject to tagList and resets tagObject
  const addTag = async () => {
    const newTag = tagObject;
    const newTagList = [...tagList, newTag];
    setTagList(newTagList);
    setTagObject('');
  };

  return (
    <>
      {/* Map tag list to tag components */}
      {tagList.map((tag) => (
        <TagRow tag={tag} key={tag} />
      ))}
      {/* Form for tag input */}
      <TagForm tagObject={tagObject} setTagObject={setTagObject} />
      {/* Button to add current tag to tag list */}
      <br />
      <button type="button" onClick={() => addTag()}>
        Add Tag
      </button>
    </>
  );
}

export default TagEntry;
