/* eslint-disable import/no-extraneous-dependencies */
import expressAsyncHandler from 'express-async-handler';
import { User } from '../models/userModel';

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
    });

    // Send a response indicating the user has been synced
    res.status(201).json({ message: 'User synced successfully' });
  } else {
    // Send a response indicating the user already exists
    res.status(200).json({ message: 'User already exists' });
  }
});

// DELETE:/api/user/profile
// Delete user account from MongoDB
export const deleteProfile = expressAsyncHandler(async (req, res) => {
  const { sub } = req.body;

  try {
    // Delete user account from MongoDB
    await User.deleteOne({ userId: sub });
    // Send a response indicating the profile has been deleted
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500);
    throw new Error('Error deleting user');
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
