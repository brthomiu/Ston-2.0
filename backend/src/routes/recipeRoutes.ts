/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import { createRecipe, getRecipes, deleteRecipe } from '../controllers/recipeController';

const router = express.Router();

// GET:/api/recipe - Get recipe list from MongoDB
router.get('/api/recipe/', getRecipes);

// POST:/api/recipe - Post recipe to MongoDB
router.post('/api/recipe/', createRecipe);

// DELETE:/api/recipe - Delete recipe from MongoDB
router.delete('/api/recipe/', deleteRecipe);

export default router;
