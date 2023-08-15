"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-extraneous-dependencies */
const express_1 = __importDefault(require("express"));
const recipeController_1 = require("../controllers/recipeController");
const router = express_1.default.Router();
// GET:/api/recipe - Get recipe list from MongoDB
router.get('/api/recipe/', recipeController_1.getRecipes);
// POST:/api/recipe - Post recipe to MongoDB
router.post('/api/recipe/', recipeController_1.createRecipe);
// DELETE:/api/recipe - Delete recipe from MongoDB
router.delete('/api/recipe/', recipeController_1.deleteRecipe);
// PUT:/api/recipe - Like a recipe
router.put('/api/recipe/', recipeController_1.likeRecipe);
exports.default = router;
