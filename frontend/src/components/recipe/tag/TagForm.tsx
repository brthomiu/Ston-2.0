import { TagsInput } from 'react-tag-input-component';
import { IRecipeProps } from '../../../types/recipeTypes';

function TagForm({
  tagList,
  setTagList,
}: {
  tagList: string[];
  setTagList: IRecipeProps['setTagList'];
}) {
  return (
    <>
      <h2>TAG FORM</h2>
      <pre>{JSON.stringify(tagList)}</pre>
      <TagsInput
        value={tagList}
        onChange={setTagList}
        name="tags"
        placeHolder="enter tags"
      />
    </>
  );
}

export default TagForm;
