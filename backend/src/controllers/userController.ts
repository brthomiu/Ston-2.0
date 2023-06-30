import { Response } from 'express';
import { User } from '../models/userModel';
import { db } from '../utils/connectToDb';
import IUser from '../types/auth/authTypes';

// POST:/api/user/profile - Retrieve user profile from MongoDB
export const getUserProfile = async (user: IUser, res: Response) => {
  // Find matching user in MongoDB
  const userProfile = await User.find({
    userId: user.sub,
  }).exec();
  console.log('userController getUserProfile userProfile: ', userProfile);
  if (!userProfile) {
    throw new Error('POST:/api/user/profile - Failed to retrieve user profile');
  }
  res.json(userProfile); // Return user profile data
};

// POST:/api/user - Sync Auth0 user object with MongoDB
export const syncUser = async (user: IUser, res: Response) => {
  // Check for auth0 user object
  if (!user.sub) {
    throw new Error('POST:/api/user - Failed to find authorized user');
  }

  // Get user ID from auth0 and check if user already exists in MongoDB
  const userId = user.sub;
  const name = user.name;
  const email = user.email;
  const currentUser = await db.collection('users').findOne({ userId });

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
};

// DELETE:/api/user - Delete user account from MongoDB and from Auth0
export const deleteUser = async (user: IUser, res: Response) => {
  try {
    const userId = user.sub;

    // Delete user account from MongoDB
    await db.collection('users').deleteOne({ userId });

    // Optionally, you can also implement the deletion of the user account from Auth0 here

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
