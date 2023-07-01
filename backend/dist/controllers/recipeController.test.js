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
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const vitest_1 = require("vitest");
const recipeModel_1 = require("../models/recipeModel");
const recipeController_1 = require("./recipeController");
// Mock the Recipe model
vitest_1.vi.mock('../models/recipeModel', () => ({
    Recipe: {
        find: vitest_1.vi.fn(),
    },
}));
(0, vitest_1.describe)('getRecipes', () => {
    (0, vitest_1.it)('should retrieve recipes from MongoDB and return them as JSON', () => __awaiter(void 0, void 0, void 0, function* () {
        const mockRecipes = [
            { recipeName: 'Recipe 1' },
            { recipeName: 'Recipe 2' },
        ];
        recipeModel_1.Recipe.find(mockRecipes);
        const req = {};
        const res = {
            status: vitest_1.vi.fn().mockReturnThis(),
            json: vitest_1.vi.fn(),
        };
        const next = vitest_1.vi.fn();
        yield (0, express_async_handler_1.default)(recipeController_1.getRecipes)(req, res, next);
        (0, vitest_1.expect)(recipeModel_1.Recipe.find).toHaveBeenCalledTimes(1);
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(200);
        (0, vitest_1.expect)(res.json).toHaveBeenCalledWith(mockRecipes);
        (0, vitest_1.expect)(next).not.toHaveBeenCalled();
    }));
    (0, vitest_1.it)('should handle errors and send a 500 response', () => __awaiter(void 0, void 0, void 0, function* () {
        const error = new Error('Database error');
        recipeModel_1.Recipe.find(error);
        const req = {};
        const res = {
            status: vitest_1.vi.fn().mockReturnThis(),
            json: vitest_1.vi.fn(),
        };
        const next = vitest_1.vi.fn();
        yield (0, express_async_handler_1.default)(recipeController_1.getRecipes)(req, res, next);
        (0, vitest_1.expect)(recipeModel_1.Recipe.find).toHaveBeenCalledTimes(1);
        (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(500);
        (0, vitest_1.expect)(res.json).toHaveBeenCalledWith({ message: 'Server error' });
        (0, vitest_1.expect)(next).not.toHaveBeenCalled();
    }));
});
