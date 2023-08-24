import express from 'express';
import {
  syncUser,
  getUserProfile,
  deleteProfile,
  getUserRecipes,
  newUserFalse,
} from '../controllers/userController';

const router = express.Router();

// POST:/api/user/profile - Get user data object from MongoDB
router.post('/api/user/profile', getUserProfile);

// POST:/api/user - Sync user auth object with MongoDB
router.post('/api/user', syncUser);

// POST:/api/user/recipes - Get user recipe list from MongoDB
router.post('/api/user/recipes', getUserRecipes)

// DELETE:/api/user/profile - Delete user profile from MongoDB
router.delete('/api/user/profile', deleteProfile);

// POST:/api/user/intro - Sets 'newUser' to false when user finishes profile creation
router.post('/api/user/intro', newUserFalse);

// UNDER CONSTRUCTION ----------
// // DELETE:/api/user - Delete user account from Auth0
// router.delete('/api/user/', deleteAccount);

export default router;
