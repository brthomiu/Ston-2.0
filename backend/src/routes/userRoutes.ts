import express from 'express';
import {
  syncUser,
  getUserProfile,
  deleteProfile,
  addProfileRecipe,
  removeProfileRecipe,
} from '../controllers/userController';

const router = express.Router();

// POST:/api/user/profile - Get user data object from MongoDB
router.post('/api/user/profile', getUserProfile);

// POST:/api/user - Sync user auth object with MongoDB
router.post('/api/user', syncUser);

// PUT:/api/user/recipes - Adds new recipe to user profile
router.put('/api/user/recipes', addProfileRecipe);

// DELETE:/api/user/recipes - Removes recipe from user profile upon deletion
router.delete('/api/user/recipes', removeProfileRecipe);

// DELETE:/api/user/profile - Delete user profile from MongoDB
router.delete('/api/user/profile', deleteProfile);

// UNDER CONSTRUCTION ----------
// // DELETE:/api/user - Delete user account from Auth0
// router.delete('/api/user/', deleteAccount);

export default router;
