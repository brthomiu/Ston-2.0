/* eslint-disable no-console */
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { IRecipe } from '../types/recipeTypes';

const API_URL = process.env.VITE_API_URL || 'http://localhost:8000/';

export const getRecipes = async () => {
  try {
    const response = await axios.get(`${API_URL}api/recipe/`);
    const recipes = response.data;
    return recipes;
  } catch (error) {
    throw new Error('Could not sync with the database.');
  }
};

const createRecipe = async (recipeData: IRecipe) => {
  const response = await axios.post(`${API_URL}api/recipe/`, recipeData);

  return response.data;
};

export const handleCreateRecipe = async (recipeData: IRecipe) => {
  try {
    await createRecipe(recipeData);
    // Recipe created successfully
    toast('Created new recipe!');
  } catch (error) {
    toast('Could not create recipe.');
    throw error;
  }
};

// PUT:/api/user/recipes - Adds new recipe to user profile
const updateProfileRecipes = async (recipeData: IRecipe) => {
  const response = await axios.put(`${API_URL}api/user/recipes`, recipeData);

  return response.data;
};

export const handleUpdateProfileRecipes = async (recipeData: IRecipe) => {
  try {
    await updateProfileRecipes(recipeData);
    // Profile updated successfully
  } catch (error) {
    toast('Error updating recipe list on profile.');
    throw error;
  }
};

// DELETE:/api/user/recipes - Removes recipe from user profile
const removeProfileRecipe = async (recipeData: IRecipe) => {
  const response = await axios.delete(`${API_URL}api/user/recipes`, {
    data: { recipeData },
  });

  return response.data;
};

export const handleRemoveProfileRecipe = async (recipeData: IRecipe) => {
  try {
    await removeProfileRecipe(recipeData);
    // Profile updated successfully
  } catch (error) {
    toast('Error removing recipe from profile.');
    throw error;
  }
};

// DELETE:/api/recipes - Removes recipe from database
const deleteRecipe = async (recipeId: string) => {
  await axios.delete(`${API_URL}api/recipe/`, {
    data: { recipeId },
  });
};

export const handleDeleteRecipe = async (recipeId: string) => {
  try {
    deleteRecipe(recipeId);
    // Recipe deleted successfully
    toast('Recipe deleted!');
    console.log('Recipe deleted.');
  } catch (error) {
    toast('Could not delete recipe.');
    console.log('Could not delete recipe.');
    throw error;
  }
};
