/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import {
  createUserRequestObject,
  handleLikeRecipe,
} from '../../features/recipeService';
import { IRecipe, IUserAndRecipe } from '../../types/recipeTypes';

type Props = { recipe: IRecipe };

// LikeRecipe
// Button to like/dislike recipes
export default function LikeRecipe({ recipe }: Props) {
  const user = createUserRequestObject();

  const likeData: IUserAndRecipe = { user, recipe };

  // Function to increment/decrement like counter

  return (
    <div>
      <button onClick={() => handleLikeRecipe(likeData)} type="button">
        Like
      </button>
    </div>
  );
}
