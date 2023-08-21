/* eslint-disable import/no-extraneous-dependencies */
import expressAsyncHandler from 'express-async-handler';
import { User } from '../models/userModel';
import { Recipe } from '../models/recipeModel';

// POST:/api/user/profile
// Retrieve user profile from MongoDB
export const getUserProfile = expressAsyncHandler(async (req, res) => {
  const { sub } = req.body;

  // Find matching user in MongoDB
  const userProfile = await User.find({
    userId: sub,
  }).exec();

  if (!userProfile) {
    res.status(404);
    throw new Error('Failed to retrieve user profile');
  }

  res.json(userProfile); // Return user profile data
});

// POST:/api/user/recipes
// Retrieves users list of recipes from MongoDB
export const getUserRecipes = expressAsyncHandler(async (req, res) => {
  const { name } = req.body;
  console.log(name);
  // Find matching user in MongoDB
  const recipes = await Recipe.find({
    owner: name,
  }).exec();

  if (!recipes) {
    res.status(404);
    throw new Error('Failed to retrieve user recipes');
  }

  res.json(recipes); // Return user recipe data
});
// POST:/api/user
// Sync Auth0 user object with MongoDB
export const syncUser = expressAsyncHandler(async (req, res) => {
  const { sub, name, email } = req.body;

  // Check for auth0 user object
  if (!sub) {
    res.status(400);
    throw new Error('Failed to find authorized user');
  }

  // Get user ID from auth0 and check if user already exists in MongoDB
  const userId = sub;
  const currentUser = await User.findOne({ userId });

  // Create a user object if there is not a match in MongoDB
  if (!currentUser) {
    await User.create({
      userId,
      name,
      email,
      description: `${name} has not created a profile yet.`,
      private: false,
      recipes: [],
      favorites: [],
      newUser: true,
      stats: {
        likes: 0,
        recipes: 0,
        follows: 0,
        followers: 0,
        recipeLikes: 0,
      },
    });

    // Send a response indicating the user has been synced
    res.status(201).json({ message: 'User synced successfully' });
  } else {
    // Send a response indicating the user already exists
    res.status(200).json({ message: 'User already exists' });
  }
});

// PUT:/api/user/recipes
// Adds recipe to user's created recipe list
export const addProfileRecipe = expressAsyncHandler(async (req, res) => {
  const { recipeId, owner } = req.body;

  try {
    // Get the current user recipe array and push the new recipe onto it
    const oldUserDoc = await User.findOne({ name: owner });
    oldUserDoc?.recipes.push(recipeId);
    const newRecipeArray = oldUserDoc?.recipes;

    // Update recipes array on user object with the new recipe array
    const filter = { name: owner };
    const update = { recipes: newRecipeArray };

    // `doc` is the document _after_ `update` was applied because of
    // `new: true`
    const doc = await User.findOneAndUpdate(filter, update, {
      new: true,
    });
  } catch (error) {
    res.status(500);
    throw new Error('Error updating recipe list');
  }
});

// DELETE:/api/user/recipes
// Removes recipe from user profile upon deletion
export const removeProfileRecipe = expressAsyncHandler(async (req, res) => {
  const { owner, recipeId } = req.body.recipeData;

  try {
    // Get the current user recipe array and remove the old recipe from it
    const oldUserDoc = await User.findOne({ name: owner });
    const oldRecipeArray = oldUserDoc?.recipes;
    const index: number = oldUserDoc?.recipes.indexOf(recipeId)!;
    if (index > -1) {
      oldRecipeArray?.splice(index, 1);
    }
    const newRecipeArray = oldRecipeArray;

    // Update recipes array on user object with the new recipe array
    const filter = { name: owner };
    const update = { recipes: newRecipeArray };

    // `doc` is the document _after_ `update` was applied because of
    // `new: true`
    const doc = await User.findOneAndUpdate(filter, update, {
      new: true,
    });
  } catch (error) {
    res.status(500);
    throw new Error('Error updating recipe list');
  }
});

// DELETE:/api/user/profile
// Delete user account from MongoDB
export const deleteProfile = expressAsyncHandler(async (req, res) => {
  const { user } = req.body;

  try {
    // Delete user account from MongoDB
    await Recipe.deleteMany({ owner: user.name });
    await User.deleteOne({ userId: user.userId });
    // Send a response indicating the profile has been deleted
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500);
    throw new Error('Error deleting user');
  }
});

// POST:/api/user/intro
// Sets 'newUser' to false when user finishes profile creation
export const newUserFalse = expressAsyncHandler(async (req, res) => {
  const { userId } = req.body;
  console.log('req body: ', req.body);

  try {
    // Update recipes array on user object with the new recipe array
    const filter = { userId: userId };
    const update = { newUser: false };

    // `doc` is the document _after_ `update` was applied because of
    // `new: true`
    const doc = await User.findOneAndUpdate(filter, update, {
      new: true,
    });
  } catch (error) {
    res.status(500);
    throw new Error('Error finishing introduction');
  }
});

// // UNDER CONSTRUCTION
// // DELETE:/api/user
// // Delete user account from MongoDB and from Auth0
// export const deleteAccount = expressAsyncHandler(async (req, res) => {
//   try {
//     // Implement the deletion of the user account from Auth0 here
//     res.status(200).json({ message: 'Account deleted successfully' });
//   } catch (error) {
//     res.status(500);
//     throw new Error('Error deleting account');
//   }
// });
