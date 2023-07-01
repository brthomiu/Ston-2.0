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
  const { owner, recipeName, ingredients, recipeBody } = req.body;

  if (!owner || !recipeName || !ingredients || !recipeBody) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // // Check if the recipe name is already used
  // const existingRecipe = await Recipe.findOne({ recipeName });
  // if (existingRecipe) {
  //   res.status(400);
  //   throw new Error('Recipe name already exists');
  // }

  // Create recipe
  const recipe = await Recipe.create({
    owner,
    recipeName,
    ingredients,
    recipeBody,
    likers: [],
    images: [],
    tags: [],
  });

  if (recipe) {
    res.status(201).json({
      _id: recipe._id,
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

// POST:/api/recipe
// Post a new recipe to MongoDB
// export const createRecipe = expressAsyncHandler(async (req, res) => {
//   const { owner, recipeName, ingredients, recipeBody } = req.body;

//   if (!owner || !recipeName || !ingredients || !recipeBody) {
//     res.status(400);
//     throw new Error('Please add all fields');
//   }

//   // Create recipe
//   const recipe = await Recipe.create({
//     owner,
//     recipeName,
//     ingredients,
//     recipeBody,
//     likers: [],
//     image: '',
//   });

//   if (recipe) {
//     res.status(201).json({
//       _id: recipe._id,
//       owner: recipe.owner,
//       recipeName: recipe.recipeName,
//       ingredients: recipe.ingredients,
//       recipe: recipe.recipeBody,
//       likers: recipe.likers,
//     });
//   } else {
//     res.status(400);
//     throw new Error('Invalid user data');
//   }
// });
