/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { getRecipes } from '../features/recipeService';
import { IRecipe } from '../types/recipeTypes';

export const useFetchRecipes = (reload: boolean) => {
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
  }, [reload]);

  return userRecipeData;
};

export default useFetchRecipes;
