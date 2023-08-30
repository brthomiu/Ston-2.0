/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable no-console */
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { IUserAndRecipe } from '../types/recipeTypes';
import { IUserDBData, IUserStats } from '../types/authTypes';

const API_URL = 'http://localhost:8000/';

// const API_URL = process.env.VITE_API_URL || 'http://localhost:8000/';

// getRecipes
// GET:/api/recipe - Gets list of recipes
export const getRecipes = async () => {
  try {
    const response = await axios.get(`${API_URL}api/recipe/`);
    return response.data;
  } catch (error) {
    throw new Error('Could not sync with the database.');
  }
};

// createRecipe
// POST:/api/recipe - Creates a new recipe
const createRecipe = async (recipeData: IUserAndRecipe) => {
  const response = await axios.post(`${API_URL}api/recipe/`, recipeData);
  return response.data;
};

// handleCreateRecipe
// Handler function that creates a new recipe in the database and adds it to the user profile
export const handleCreateRecipe = async (recipeData: IUserAndRecipe) => {
  try {
    // Create new recipe
    createRecipe(recipeData);
    toast('Created new recipe!');
  } catch (error) {
    toast('Could not create recipe.');
    throw error;
  }
};

// likeRecipe
// PUT:/api/recipe - Handles liking/disliking recipes
const likeRecipe = async (likeData: IUserAndRecipe) => {
  const response = await axios.put(`${API_URL}api/recipe/`, likeData);
  return response.data;
};

export const handleLikeRecipe = async (likeData: IUserAndRecipe) => {
  try {
    console.log('recipeService - handleLikeRecipe - likeData: ', likeData);
    likeRecipe(likeData);
  } catch (error) {
    toast('Error liking recipe.');
  }
};

// deleteRecipe
// DELETE:/api/recipe - Removes recipe from database
const deleteRecipe = async (userAndRecipe: IUserAndRecipe) => {
  await axios.delete(`${API_URL}api/recipe/`, {
    data: { userAndRecipe },
  });
};

// handleDeleteRecipe
// Handler function that deletes recipe from user's profile and database
export const handleDeleteRecipe = async (userAndRecipe: IUserAndRecipe) => {
  try {
    deleteRecipe(userAndRecipe);
    // Recipe deleted successfully
    toast('Recipe deleted!');
    console.log('Recipe deleted.');
  } catch (error) {
    toast('Could not delete recipe.');
    console.log('Could not delete recipe.');
    throw error;
  }
};

// createUserRequestObject
// Creates properly typed user object for backend requst

export const createUserRequestObject = () => {
  // Create the correctly typed object to send to the backend
  const getPrivate = () => {
    const isPrivate = localStorage.getItem('private');
    if (!isPrivate) {
      return false;
    }
    return true;
  };

  const user: IUserDBData = {
    _id: localStorage.getItem('_id')! as string,
    description: localStorage.getItem('description')! as string,
    name: localStorage.getItem('name')! as string,
    displayName: localStorage.getItem('displayName')! as string,
    email: localStorage.getItem('email')! as string,
    private: getPrivate(),
    userId: localStorage.getItem('userId')! as string,
    newUser: JSON.parse(localStorage.getItem('newUser')!) as boolean,
    stats: JSON.parse(localStorage.getItem('stats')!) as IUserStats,
  };

  return user;
};
