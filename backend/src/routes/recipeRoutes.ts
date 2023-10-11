/* eslint-disable import/no-extraneous-dependencies */
import express from 'express';
import { createRecipe, getRecipes, deleteRecipe, likeRecipe, uploadRecipeImage } from '../controllers/recipeController';

const router = express.Router();

// GET:/api/recipe - Get recipe list from MongoDB
router.get('/api/recipe/', getRecipes);

// POST:/api/recipe - Post recipe to MongoDB
router.post('/api/recipe/', createRecipe);

// DELETE:/api/recipe - Delete recipe from MongoDB
router.delete('/api/recipe/', deleteRecipe);

// PUT:/api/recipe - Like a recipe
router.put('/api/recipe/', likeRecipe)

// POST:/api/recipe/image - Upload recipe image to MongoDB
router.post('/api/recipe/image', uploadRecipeImage)

export default router;
