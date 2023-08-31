import { useState } from 'react';
import { toast } from 'react-hot-toast';
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
    // Input validation to prevent blank or duplicate tags
    if (tagList.includes(tagObject)) {
      toast('Tag already exists.');
    } else if (tagObject === '') {
      toast('Tag is empty.');
    } else {
      const newTag = tagObject;
      const newTagList = [...tagList, newTag];
      setTagList(newTagList);
      setTagObject('');
    }
  };

  // removeTag
  // Removes entry from tagList
  const removeTag = (tag: string) => {
    const index = tagList.indexOf(tag);
    const newTagList = [...tagList];
    newTagList.splice(index, 1);
    setTagList(newTagList);
  };

  return (
    <>
      {tagList.length > 0 && (
        <div className="flex flex-row justify-between pl-2 pr-4 mb-2 w-[350px] self-center align-top h-fit items-center text-ston-brown">
          <p>Step</p> <p>Delete</p>
        </div>
      )}
      {/* Map tag list to tag components */}
      {tagList.map((tag) => (
        <TagRow tag={tag} removeTag={removeTag} key={tag} />
      ))}
      {/* Form for tag input */}
      <TagForm tagObject={tagObject} setTagObject={setTagObject} />
      {/* Button to add current tag to tag list */}
      <br />
      <button
        className="bg-ston-green font-bold my-6 w-48 self-center"
        type="button"
        onClick={() => addTag()}
      >
        Add Tag
      </button>
    </>
  );
}

export default TagEntry;
