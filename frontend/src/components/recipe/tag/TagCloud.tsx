/* eslint-disable react/no-array-index-key */
import Tag from './Tag';
import { TagProps } from '../../../types/recipeTypes';

function TagCloud({ tags }: { tags: TagProps[] }) {
  // Render the ingredient cloud component
  return (
    <>
      {tags.map((tag, index) => (
        <Tag tag={tag.tag} key={index} />
      ))}
    </>
  );
}

export default TagCloud;
