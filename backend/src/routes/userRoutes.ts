import express from 'express';
import {
  syncUser,
  getUserProfile,
  deleteProfile,
} from '../controllers/userController';

const router = express.Router();

// POST:/api/user/profile - Get user data object from MongoDB
router.post('/api/user/profile', getUserProfile);

// POST:/api/user - Sync user auth object with MongoDB
router.post('/api/user', syncUser);

// DELETE:/api/user/profile - Delete user profile from MongoDB
router.delete('/api/user/profile', deleteProfile);

// UNDER CONSTRUCTION ----------
// // DELETE:/api/user - Delete user account from Auth0
// router.delete('/api/user/', deleteAccount);

export default router;
