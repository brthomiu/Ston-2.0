import express from 'express';
import user from './userRoutes';

const router = express.Router();

router.get('/healthcheck', (_, res) => res.sendStatus(200));

router.use(user);

export default router;
