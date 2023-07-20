/* eslint-disable import/no-extraneous-dependencies */
import expressAsyncHandler from 'express-async-handler';
import { Recipe } from '../models/recipeModel';

// GET:/api/recipe
// Retrieve user profile from MongoDB
export const getRecipes = expressAsyncHandler(async (req, res) => {
  const recipes = await Recipe.find();

  res.status(200).json(recipes);
});

// POST:/api/recipe
// Post a new recipe to MongoDB
export const createRecipe = expressAsyncHandler(async (req, res) => {
  const { recipeId, owner, recipeName, ingredients, recipeBody, tags } =
    req.body;

  if (!owner || !recipeName || !ingredients || !recipeBody) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Create recipe
  const recipe = await Recipe.create({
    recipeId,
    owner,
    recipeName,
    ingredients,
    recipeBody,
    likers: [],
    images: [],
    tags,
  });
  if (recipe) {
    res.status(201).json({
      _id: recipe._id,
      recipeId: recipe.recipeId,
      owner: recipe.owner,
      recipeName: recipe.recipeName,
      ingredients: recipe.ingredients,
      recipe: recipe.recipeBody,
      likers: recipe.likers,
      tags: recipe.tags,
      images: recipe.images,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
});

// DELETE:/api/recipe
// Delete a recipe from MongoDB
export const deleteRecipe = expressAsyncHandler(async (req, res) => {
  try {
    const { recipeId } = req.body;
    await Recipe.deleteOne({ recipeId: recipeId });
  } catch (error) {
    res.status(400);
    new Error('Could not delete recipe');
  }
});
