/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { handleLikeRecipe, IUserAndRecipe } from '../../features/recipeService';
import { IUserDBData } from '../../types/authTypes';
import { IRecipe } from '../../types/recipeTypes';

type Props = { recipe: IRecipe };

// LikeRecipe
// Button to like/dislike recipes
export default function LikeRecipe({ recipe }: Props) {
  // Function to parse CSV from local storage
  const parseCSV = (input: string) => {
    return input.split(',').map((item: string) => item.trim());
  };

  // Create the correctly typed object to send to the backend
  const getFavorites = () => {
    const storedFavorites = localStorage.getItem('favorites');
    if (!storedFavorites) {
      return [];
    }
    console.log('favorites', storedFavorites);
    return parseCSV(storedFavorites);
  };

  const getPrivate = () => {
    const isPrivate = localStorage.getItem('private');
    if (!isPrivate) {
      return false;
    }
    return true;
  };

  const getRecipes = () => {
    const storedRecipes = localStorage.getItem('recipes');
    if (!storedRecipes) {
      return [];
    }
    return parseCSV(storedRecipes);
  };

  const user: IUserDBData = {
    _id: localStorage.getItem('_id')! as string,
    description: localStorage.getItem('description')! as string,
    name: localStorage.getItem('name')! as string,
    displayName: localStorage.getItem('displayName')! as string,
    email: localStorage.getItem('email')! as string,
    favorites: getFavorites(),
    private: getPrivate(),
    recipes: getRecipes(),
    userId: localStorage.getItem('userId')! as string,
    newUser: JSON.parse(localStorage.getItem('newUser')!) as boolean,
  };
  const likeData: IUserAndRecipe = { user, recipe };

  return (
    <div>
      <button onClick={() => handleLikeRecipe(likeData)} type="button">
        Like
      </button>
    </div>
  );
}
