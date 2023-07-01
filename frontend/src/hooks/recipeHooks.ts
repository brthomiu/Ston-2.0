/* eslint-disable no-console */
import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { getRecipes } from '../features/recipeService';
import { IRecipe } from '../types/recipeTypes';

export const useFetchRecipes = () => {
  const { user } = useAuth0();
  const [userRecipeData, setUserRecipeData] = useState<IRecipe[]>([]);

  useEffect(() => {
    const fetchUserRecipe = async () => {
      try {
        if (user) {
          const recipeData = await getRecipes();
          setUserRecipeData(recipeData);
        }
      } catch (error) {
        console.error('Error fetching recipe data:', error);
      }
    };

    fetchUserRecipe();
  }, [user]);

  return userRecipeData;
};

export default useFetchRecipes;
