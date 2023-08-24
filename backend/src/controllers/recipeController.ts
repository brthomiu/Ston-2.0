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
  // Get data from request
  const { recipeId, owner, recipeName, ingredients, description, tags } =
    req.body.recipe;
  const userName = req.body.user.name;
  const stats = req.body.user.stats;

  // Check that recipe object contains all fields
  if (!owner || !recipeName || !ingredients || !description) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  // Create recipe
  const recipe = await Recipe.create({
    recipeId,
    owner,
    recipeName,
    ingredients,
    description,
    likers: [],
    images: [],
    tags,
    stats: { likes: 0 },
  });

  // handleUserRecipesStat
  // Increment user recipe stat
  const handleUserRecipesStat = async (userName: string, stats: IUserStats) => {
    // Create a new stats object
    const newStats = { ...stats };
    // Increment the new stats object
    newStats.recipes += 1;
    // Filters for mongoose search
    const filter = { name: owner };
    const update = { stats: newStats };
    // Update DB with incremented stats
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
      description: recipe.description,
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
    const stats = req.body.userAndRecipe.user.stats;

    // Delete recipe
    const handleDeleteRecipe = async () => {
      await Recipe.deleteOne({ recipeId: recipeId });
    };

    // Delete corresponding likes
    const handleDeleteLikes = async () => {
      await Like.deleteMany({ recipeId: recipeId });
    };

    // handleUserRecipesStat
    // Decrement user recipe stat
    const handleUserRecipesStat = async () => {
      // Create a new stats object
      const newStats = { ...stats };
      // Increment the new stats object
      newStats.recipes -= 1;
      // Filters for mongoose search
      const filter = { name: owner };
      const update = { stats: newStats };
      // Update DB with incremented stats
      await User.findOneAndUpdate(filter, update, {
        new: true,
      });
    };

    // Handler for all of the delete functions
    const handleDelete = async () => {
      await handleUserRecipesStat();
      await handleDeleteRecipe();
      await handleDeleteLikes();
    };
    // Call the delete handler
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
      // Check to see if the user/recipe has an entry in the like table
      const likeEntry = await Like.find({
        userId: userId,
        recipeId: recipeId,
      }).exec();
      // If the entry does not exist, create it, if it does, delete it
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
    // Call updateLikes
    updateLikes(recipeId, userId);

    res.status(200).json({ id: req.params.id });
  } catch (error) {
    res.status(400);
    new Error('Could not like recipe');
  }
});
