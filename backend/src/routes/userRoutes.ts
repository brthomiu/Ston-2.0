import express from 'express';
import { registerUser, getMe } from '../controllers/userController';
import protect from '../middleware/loginMiddleware';

const router = express.Router();

router.post('/api/users', registerUser);

router.get('/me', protect, getMe);

export default router;
