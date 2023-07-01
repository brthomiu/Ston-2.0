import express from 'express';
import user from './userRoutes';
import recipe from './recipeRoutes';

const router = express.Router();

router.get('/healthcheck', (_, res) => res.sendStatus(200));

router.use(user, recipe);

export default router;
