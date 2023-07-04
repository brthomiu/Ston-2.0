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
exports.createRecipe = exports.getRecipes = void 0;
/* eslint-disable import/no-extraneous-dependencies */
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const recipeModel_1 = require("../models/recipeModel");
// GET:/api/recipe
// Retrieve user profile from MongoDB
exports.getRecipes = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const recipes = yield recipeModel_1.Recipe.find();
    res.status(200).json(recipes);
}));
// POST:/api/recipe
// Post a new recipe to MongoDB
exports.createRecipe = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { owner, recipeName, ingredients, recipeBody, tags } = req.body;
    if (!owner || !recipeName || !ingredients || !recipeBody) {
        res.status(400);
        throw new Error('Please add all fields');
    }
    // Create recipe
    const recipe = yield recipeModel_1.Recipe.create({
        owner,
        recipeName,
        ingredients,
        recipeBody,
        likers: [],
        images: [],
        tags,
    });
    console.log('recipeController recipe object:', recipe);
    if (recipe) {
        res.status(201).json({
            _id: recipe._id,
            owner: recipe.owner,
            recipeName: recipe.recipeName,
            ingredients: recipe.ingredients,
            recipe: recipe.recipeBody,
            likers: recipe.likers,
            tags: recipe.tags,
            images: recipe.images,
        });
    }
    else {
        res.status(400);
        throw new Error('Invalid user data');
    }
}));
