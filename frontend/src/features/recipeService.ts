/* eslint-disable no-console */
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { IRecipe } from '../types/recipeTypes';
import { IUserDBData } from '../types/authTypes';

const API_URL = process.env.VITE_API_URL || 'http://localhost:8000/';

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
const createRecipe = async (recipeData: IRecipe) => {
  const response = await axios.post(`${API_URL}api/recipe/`, recipeData);
  return response.data;
};

// updateProfileRecipes
// PUT:/api/user/recipes - Adds new recipe to user profile
const updateProfileRecipes = async (recipeData: IRecipe) => {
  const response = await axios.put(`${API_URL}api/user/recipes`, recipeData);

  return response.data;
};

// handleCreateRecipe
// Handler function that creates a new recipe in the database and adds it to the user profile
export const handleCreateRecipe = async (recipeData: IRecipe) => {
  try {
    // Create new recipe
    createRecipe(recipeData);
    toast('Created new recipe!');
    // Update the user's profile recipes
    updateProfileRecipes(recipeData);
  } catch (error) {
    toast('Could not create recipe.');
    throw error;
  }
};

// IUserAndRecipe
// Type interface for like request object
export interface IUserAndRecipe {
  recipe: IRecipe;
  user: IUserDBData;
}

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
const deleteRecipe = async (recipeId: string) => {
  await axios.delete(`${API_URL}api/recipe/`, {
    data: { recipeId },
  });
};

// removeProfileRecipe
// DELETE:/api/user/recipes - Removes recipe from user profile
const removeProfileRecipe = async (recipeData: IRecipe) => {
  const response = await axios.delete(`${API_URL}api/user/recipes`, {
    data: { recipeData },
  });
  return response.data;
};

// handleDeleteRecipe
// Handler function that deletes recipe from user's profile and database
export const handleDeleteRecipe = async (recipeData: IRecipe) => {
  try {
    removeProfileRecipe(recipeData);
    deleteRecipe(recipeData.recipeId);

    // Recipe deleted successfully
    toast('Recipe deleted!');
    console.log('Recipe deleted.');
  } catch (error) {
    toast('Could not delete recipe.');
    console.log('Could not delete recipe.');
    throw error;
  }
};
