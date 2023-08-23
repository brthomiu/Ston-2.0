/* eslint-disable import/no-extraneous-dependencies */
import expressAsyncHandler from 'express-async-handler';
import { Recipe } from '../models/recipeModel';
import { Like } from '../models/likeModel';
import { IUserStats, User } from '../models/userModel';

// GET:/api/recipe
// Retrieve recipe data from MongoDB
export const getRecipes = expressAsyncHandler(async (req, res) => {
  // Get recipes from MongoDB
  const recipes = await Recipe.find();

  res.status(200).json(recipes);
});

// POST:/api/recipe
// Post a new recipe to MongoDB
export const createRecipe = expressAsyncHandler(async (req, res) => {
  const { recipeId, owner, recipeName, ingredients, recipeBody, tags } =
    req.body.recipe;

  const userName = req.body.user.name;
  const stats = req.body.user.stats;

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
    stats: { likes: 0 },
  });

  // Increment user recipe stat
  const handleUserRecipesStat = async (userName: string, stats: IUserStats) => {
    const newStats = { ...stats };

    newStats.recipes += 1;

    const filter = { name: owner };
    const update = { stats: newStats };

    await User.findOneAndUpdate(filter, update, {
      new: true,
    });
  };

  if (recipe) {
    handleUserRecipesStat(userName, stats);
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
      stats: recipe.stats,
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
    // Get data from request
    const recipeId = req.body.userAndRecipe.recipe.recipeId;
    const owner = req.body.userAndRecipe.user.name;
    const userStats = req.body.userAndRecipe.user.stats;

    // Delete recipe
    const handleDeleteRecipe = async () => {
      await Recipe.deleteOne({ recipeId: recipeId });
    };

    // Delete corresponding likes
    const handleDeleteLikes = async () => {
      await Like.deleteMany({ recipeId: recipeId });
    };

    // Decrement user recipe stat
    const handleUserRecipesStat = async () => {
      const newStats = { ...userStats };

      newStats.recipes -= 1;

      const filter = { name: owner };
      const update = { stats: newStats };

      await User.findOneAndUpdate(filter, update, {
        new: true,
      });
    };

    const handleDelete = async () => {
      await handleUserRecipesStat();
      await handleDeleteRecipe();
      await handleDeleteLikes();
    };

    handleDelete();
  } catch (error) {
    res.status(400);
    new Error('Could not delete recipe');
  }
});

// PUT:/api/recipe
// Like a recipe
export const likeRecipe = expressAsyncHandler(async (req, res) => {
  try {
    // Get recipe and user objects from request
    const { recipe, user } = req.body;
    const recipeId = recipe.recipeId;
    const userId = user.userId;

    // updateLikes
    // Adds/removes entry to the table of likes
    const updateLikes = async (recipeId: string, userId: string) => {
      // find all documents named john and at least 18
      const likeEntry = await Like.find({
        userId: userId,
        recipeId: recipeId,
      }).exec();

      if (likeEntry.length === 0) {
        await Like.create({
          userId: userId,
          recipeId: recipeId,
        });
      } else if (likeEntry[0].userId) {
        await Like.deleteOne({
          userId: userId,
          recipeId: recipeId,
        });
      }
    };

    updateLikes(recipeId, userId);

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(400);
    new Error('Could not like recipe');
  }
});
