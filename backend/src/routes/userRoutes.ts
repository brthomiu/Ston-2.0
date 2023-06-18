/* eslint-disable import/no-extraneous-dependencies */
import { auth, requiresAuth } from 'express-openid-connect';
import express from 'express';

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

// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use(auth(config));

// GET req.isAuthenticated is provided from the auth router
router.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

// GET return user profile
router.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user));
});

export default router;
