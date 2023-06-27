/* eslint-disable import/no-extraneous-dependencies */
import { auth, requiresAuth } from 'express-openid-connect';
import express, { Request } from 'express';
import {
  deleteUser,
  getUser,
  syncUser,
  getUserProfile,
} from '../controllers/userController';

const oidSecret = process.env.OID_SECRET;

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: `${oidSecret}`,
  baseURL: 'http://localhost:8000',
  clientID: 'DIEeo2lgkNSzh1xW53Jq4i1UMePGXuqh',
  issuerBaseURL: 'https://dev-zwqft2uf5ljg5rdt.us.auth0.com',
};

const router = express.Router();

// Auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(config));

// GET:/api/user - Get user auth object
router.get('/api/user', requiresAuth(), async (req: Request, res) => {
  try {
    getUser(req, res);
  } catch (error) {
    console.error('Could not authenticate user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET:/api/user/profile - Get user data object from MongoDB
router.get('/api/user/profile', requiresAuth(), async (req: Request, res) => {
  try {
    await getUserProfile(req, res);
  } catch (error) {
    console.error('Error retrieving user profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST:/api/user - Sync user auth object with MongoDB
router.post('/api/user', requiresAuth(), async (req: Request, res) => {
  try {
    const userData = req.body; // User data is sent in the request body
    syncUser(userData, res);
  } catch (error) {
    console.error('Error syncing with database:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// DELETE:/api/user - Delete user account from MongoDB and from Auth0
router.delete('/api/user', requiresAuth(), async (req: Request, res) => {
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
