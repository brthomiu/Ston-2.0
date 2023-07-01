/* eslint-disable no-console */
import axios from 'axios';
import { IRecipe } from '../types/recipeTypes';

const API_URL = process.env.VITE_API_URL || 'http://localhost:8000/';

export const getRecipes = async () => {
  try {
    const response = await axios.get(`${API_URL}api/recipe/`);
    const recipes = response.data;
    console.log('recipeService getRecipes recipe data:', recipes);
    return recipes;
  } catch (error) {
    throw new Error('Could not sync with the database.');
  }
};

export const createRecipe = async (recipeData: IRecipe) => {
  const response = await axios.post(`${API_URL}api/recipe/`, recipeData);

  return response.data;
};
