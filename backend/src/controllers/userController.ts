import { Request, Response } from 'express';
import { User } from '../models/userModel';
import { db } from '../utils/connectToDb';

// Interface for user data being handled by the client
export interface IUserData {
  userId: string;
  name: string;
  email: string;
}

// GET:/api/user - Retrieve user auth object and sync to mongoDB
export const getUser = async (req: Request, res: Response) => {
  // Check for auth0 user object
  if (!req.oidc.user) {
    throw new Error('GET:/api/user - Failed to find authorized user');
  }
  // Return current user object
  const user = {
    userId: req.oidc.user.sub,
    name: req.oidc.user.name,
    email: req.oidc.user.email,
    // Add any other desired fields from Auth0's user object
  };
  res.json(user);
};

// GET:/api/user/profile - Retrieve user auth object and sync to mongoDB
export const getUserProfile = async (req: Request, res: Response) => {
  // Check for auth0 user object
  if (!req.oidc.user) {
    throw new Error('GET:/api/user/profile - Failed to find authorized user');
  }
  // Return current user object
  const user = {
    userId: req.oidc.user.sub,
    name: req.oidc.user.name,
    email: req.oidc.user.email,
    // Add any other desired fields from Auth0's user object
  };
  // Find matching user in MongoDB
  const userProfile = await User.find({
    userId: user.userId,
  }).exec();
  if (!userProfile) {
    throw new Error('GET:/api/user/profile - Failed to retrieve user profile');
  }
  res.json(userProfile); // Return user profile data
};

// POST:/api/user - Sync Auth0 user object with MongoDB
export const syncUser = async (userData: IUserData, res: Response) => {
  // Check for auth0 user object
  if (!userData) {
    throw new Error('POST:/api/user - Failed to find authorized user');
  }

  // Get user ID from auth0 and check if user already exists in MongoDB
  const userId = userData.userId;
  const name = userData.name;
  const email = userData.email;
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
export const deleteUser = async (userData: IUserData, res: Response) => {
  try {
    const userId = userData.userId;

    // Delete user account from MongoDB
    await db.collection('users').deleteOne({ userId });

    // Optionally, you can also implement the deletion of the user account from Auth0 here

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
