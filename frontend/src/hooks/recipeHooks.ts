/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { getRecipes } from '../features/recipeService';
import { IRecipe } from '../types/recipeTypes';

// useFetchRecipes
// Fetches and renders recipes
export const useFetchRecipes = () => {
  const [userRecipeData, setUserRecipeData] = useState<IRecipe[]>([]);

  useEffect(() => {
    const fetchUserRecipe = async () => {
      try {
        const recipeData = await getRecipes();
        setUserRecipeData(recipeData);
      } catch (error) {
        console.error('Error fetching recipe data:', error);
      }
    };

    fetchUserRecipe();
  }, [userRecipeData]);

  return userRecipeData;
};

export default useFetchRecipes;
