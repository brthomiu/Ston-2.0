"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable global-require */
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const vitest_1 = require("vitest");
const app = (0, express_1.default)();
// Mock the Recipe model and its functions
vitest_1.vi.mock('../models/recipeModel', () => ({
    Recipe: {
        find: vitest_1.vi.fn(),
        create: vitest_1.vi.fn(),
    },
}));
(0, vitest_1.describe)('Recipe Routes', () => {
    (0, vitest_1.beforeEach)(() => {
        vitest_1.vi.clearAllMocks();
    });
    (0, vitest_1.describe)('GET /api/recipe', () => {
        (0, vitest_1.it)('should get recipe list from MongoDB and return a 200 status', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockRecipes = [
                { recipeName: 'Recipe 1' },
                { recipeName: 'Recipe 2' },
            ];
            const mockResponse = { status: 200, json: vitest_1.vi.fn() };
            const req = (0, supertest_1.default)(app);
            // Mock the Recipe model's find function
            const Recipe = require('../models/recipeModel').Recipe;
            Recipe.find.mockResolvedValue(mockRecipes);
            yield req.get('/api/recipe').expect(mockResponse);
            (0, vitest_1.expect)(Recipe.find).toHaveBeenCalledTimes(1);
            (0, vitest_1.expect)(mockResponse.json).toHaveBeenCalledWith(mockRecipes);
        }));
    });
    (0, vitest_1.describe)('POST /api/recipe', () => {
        (0, vitest_1.it)('should post a new recipe to MongoDB and return a 201 status', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockRecipeData = {
                owner: 'John Doe',
                recipeName: 'New Recipe',
                ingredients: ['Ingredient 1', 'Ingredient 2'],
                recipeBody: 'Recipe Body',
            };
            const mockResponse = { status: 201, json: vitest_1.vi.fn() };
            const req = (0, supertest_1.default)(app);
            // Mock the Recipe model's create function
            const Recipe = require('../models/recipeModel').Recipe;
            Recipe.create.mockResolvedValue(mockRecipeData);
            yield req.post('/api/recipe').send(mockRecipeData).expect(mockResponse);
            (0, vitest_1.expect)(Recipe.create).toHaveBeenCalledTimes(1);
            (0, vitest_1.expect)(mockResponse.json).toHaveBeenCalledWith({
                owner: mockRecipeData.owner,
                recipeName: mockRecipeData.recipeName,
                ingredients: mockRecipeData.ingredients,
                recipe: mockRecipeData.recipeBody,
            });
        }));
        (0, vitest_1.it)('should handle missing fields and return a 400 status', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockRecipeData = {
                owner: 'John Doe',
                recipeName: 'New Recipe',
                ingredients: ['Ingredient 1', 'Ingredient 2'],
            };
            const mockResponse = { status: 400, json: vitest_1.vi.fn() };
            const req = (0, supertest_1.default)(app);
            yield req.post('/api/recipe').send(mockRecipeData).expect(mockResponse);
            (0, vitest_1.expect)(mockResponse.json).toHaveBeenCalledWith({
                message: 'Please add all fields',
            });
        }));
        (0, vitest_1.it)('should handle invalid data and return a 400 status', () => __awaiter(void 0, void 0, void 0, function* () {
            const mockRecipeData = {
                owner: 'John Doe',
                recipeName: 'New Recipe',
                ingredients: ['Ingredient 1', 'Ingredient 2'],
                recipeBody: 'Recipe Body',
            };
            const mockResponse = { status: 400, json: vitest_1.vi.fn() };
            const req = (0, supertest_1.default)(app);
            // Mock the Recipe model's create function to return null
            const Recipe = require('../models/recipeModel').Recipe;
            Recipe.create.mockResolvedValue(null);
            yield req.post('/api/recipe').send(mockRecipeData).expect(mockResponse);
            (0, vitest_1.expect)(Recipe.create).toHaveBeenCalledTimes(1);
            (0, vitest_1.expect)(mockResponse.json).toHaveBeenCalledWith({
                message: 'Invalid user data',
            });
        }));
    });
});
