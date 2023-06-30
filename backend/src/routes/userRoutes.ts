/* eslint-disable import/no-extraneous-dependencies */
import express, { Request } from 'express';
import {
  deleteUser,
  // getUser,
  syncUser,
  getUserProfile,
} from '../controllers/userController';

const router = express.Router();

// POST:/api/user/profile - Get user data object from MongoDB
router.post('/api/user/profile', async (req: Request, res) => {
  try {
    const userData = req.body;
    await getUserProfile(userData, res);
  } catch (error) {
    console.error('Error retrieving user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST:/api/user - Sync user auth object with MongoDB
router.post('/api/user', async (req: Request, res) => {
  try {
    const userData = req.body; // User data is sent in the request body
    syncUser(userData, res);
  } catch (error) {
    console.error('Error syncing with database:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE:/api/user - Delete user account from MongoDB and from Auth0
router.delete('/api/user', async (req: Request, res) => {
  try {
    const userData = req.body; // User data is sent in the request body
    deleteUser(userData, res);
  } catch (error) {
    console.error('Error syncing with database:', error);
    res.status(500).json({ message: 'Server error' });
  }
  // CODE TO DELETE USER FROM AUTH0 GOES HERE
  // NEED THIS TO BE GDPR COMPLIANT
});
export default router;
