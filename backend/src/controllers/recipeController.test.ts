import { Request, Response } from 'express';
import expressAsyncHandler from 'express-async-handler';
import { vi, describe, it, expect } from 'vitest';
import { Recipe } from '../models/recipeModel';
import { getRecipes } from './recipeController';

// Mock the Recipe model
vi.mock('../models/recipeModel', () => ({
  Recipe: {
    find: vi.fn(),
  },
}));

describe('getRecipes', () => {
  it('should retrieve recipes from MongoDB and return them as JSON', async () => {
    const mockRecipes = [
      { recipeName: 'Recipe 1' },
      { recipeName: 'Recipe 2' },
    ];
    Recipe.find(mockRecipes);

    const req: Request = {} as Request;
    const res: Response = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;
    const next = vi.fn();

    await expressAsyncHandler(getRecipes)(req, res, next);

    expect(Recipe.find).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockRecipes);
    expect(next).not.toHaveBeenCalled();
  });

  it('should handle errors and send a 500 response', async () => {
    const error = new Error('Database error');
    Recipe.find(error);

    const req: Request = {} as Request;
    const res: Response = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    } as unknown as Response;
    const next = vi.fn();

    await expressAsyncHandler(getRecipes)(req, res, next);

    expect(Recipe.find).toHaveBeenCalledTimes(1);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Server error' });
    expect(next).not.toHaveBeenCalled();
  });
});
