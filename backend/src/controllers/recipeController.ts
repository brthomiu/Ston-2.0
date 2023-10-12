import expressAsyncHandler from 'express-async-handler';
import { Recipe } from '../models/recipeModel';
import { Like } from '../models/likeModel';
import { IUserStats, User } from '../models/userModel';
import multer from 'multer';
import fs from 'fs';
import { Image } from '../models/imageModel';

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
  const {
    recipeId,
    owner,
    recipeName,
    ingredients,
    description,
    tags,
    difficulty,
    time,
    steps,
    images,
  } = req.body.recipe;
  const userName = req.body.user.name;
  const stats = req.body.user.stats;

  // Check that recipe object contains all fields
  if (
    !owner ||
    !recipeName ||
    !ingredients ||
    !description ||
    !steps ||
    !difficulty ||
    !time ||
    !images
  ) {
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
    steps,
    likers: [],
    images,
    tags,
    difficulty,
    time,
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
      steps: recipe.steps,
      tags: recipe.tags,
      difficulty: recipe.difficulty,
      time: recipe.time,
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

// POST:/api/recipe/image - Upload recipe image to MongoDB

// Multer upload path
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniquePrefix + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

export const uploadRecipeImage = expressAsyncHandler(async (req, res) => {
  upload.single('image')(req, res, async function (err) {
    if (err) {
      return res.status(400).send('Could not upload image to server!');
    }

    const imageId = req.body.imageId;
    const fileName = req.file!.filename;

    console.log('fileName------------------', fileName);
    console.log('imageId-----------------------', imageId);

    const imageData = {
      imageId: imageId,
      image: fs.readFileSync(`./uploads/${fileName}`),
    };

    res.status(200).send('Image uploaded to server successfully!');

    try {
      await Image.create(imageData);
      res.status(200).send('Image uploaded to DB successfully!');
    } catch (error) {
      new Error('Could not upload image to DB!');
    }
  });
});
