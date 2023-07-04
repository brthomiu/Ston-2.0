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
    const response = await createRecipe(recipeData);
    // Recipe created successfully
    toast('Created new recipe!');
    console.log('Recipe created:', response);
  } catch (error) {
    toast('Could not create recipe.');
    console.log('Could not create recipe.');
    throw error; // Rethrow the error
  }
};
