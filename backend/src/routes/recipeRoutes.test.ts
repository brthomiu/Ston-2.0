/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
import request from 'supertest';
import express from 'express';
import { vi, describe, beforeEach, it, expect } from 'vitest';

const app = express();

// Mock the Recipe model and its functions
vi.mock('../models/recipeModel', () => ({
  Recipe: {
    find: vi.fn(),
    create: vi.fn(),
  },
}));

describe('Recipe Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('GET /api/recipe', () => {
    it('should get recipe list from MongoDB and return a 200 status', async () => {
      const mockRecipes = [
        { recipeName: 'Recipe 1' },
        { recipeName: 'Recipe 2' },
      ];
      const mockResponse = { status: 200, json: vi.fn() };
      const req = request(app);

      // Mock the Recipe model's find function
      const Recipe = require('../models/recipeModel').Recipe;
      Recipe.find.mockResolvedValue(mockRecipes);

      await req.get('/api/recipe').expect(mockResponse);

      expect(Recipe.find).toHaveBeenCalledTimes(1);
      expect(mockResponse.json).toHaveBeenCalledWith(mockRecipes);
    });
  });

  describe('POST /api/recipe', () => {
    it('should post a new recipe to MongoDB and return a 201 status', async () => {
      const mockRecipeData = {
        owner: 'John Doe',
        recipeName: 'New Recipe',
        ingredients: ['Ingredient 1', 'Ingredient 2'],
        recipeBody: 'Recipe Body',
      };
      const mockResponse = { status: 201, json: vi.fn() };
      const req = request(app);

      // Mock the Recipe model's create function
      const Recipe = require('../models/recipeModel').Recipe;
      Recipe.create.mockResolvedValue(mockRecipeData);

      await req.post('/api/recipe').send(mockRecipeData).expect(mockResponse);

      expect(Recipe.create).toHaveBeenCalledTimes(1);
      expect(mockResponse.json).toHaveBeenCalledWith({
        owner: mockRecipeData.owner,
        recipeName: mockRecipeData.recipeName,
        ingredients: mockRecipeData.ingredients,
        recipe: mockRecipeData.recipeBody,
      });
    });

    it('should handle missing fields and return a 400 status', async () => {
      const mockRecipeData = {
        owner: 'John Doe',
        recipeName: 'New Recipe',
        ingredients: ['Ingredient 1', 'Ingredient 2'],
      };
      const mockResponse = { status: 400, json: vi.fn() };
      const req = request(app);

      await req.post('/api/recipe').send(mockRecipeData).expect(mockResponse);

      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Please add all fields',
      });
    });

    it('should handle invalid data and return a 400 status', async () => {
      const mockRecipeData = {
        owner: 'John Doe',
        recipeName: 'New Recipe',
        ingredients: ['Ingredient 1', 'Ingredient 2'],
        recipeBody: 'Recipe Body',
      };
      const mockResponse = { status: 400, json: vi.fn() };
      const req = request(app);

      // Mock the Recipe model's create function to return null
      const Recipe = require('../models/recipeModel').Recipe;
      Recipe.create.mockResolvedValue(null);

      await req.post('/api/recipe').send(mockRecipeData).expect(mockResponse);

      expect(Recipe.create).toHaveBeenCalledTimes(1);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: 'Invalid user data',
      });
    });
  });
});
