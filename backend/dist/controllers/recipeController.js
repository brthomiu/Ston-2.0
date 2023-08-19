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
exports.likeRecipe = exports.deleteRecipe = exports.createRecipe = exports.getRecipes = void 0;
/* eslint-disable import/no-extraneous-dependencies */
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const recipeModel_1 = require("../models/recipeModel");
const likeModel_1 = require("../models/likeModel");
// GET:/api/recipe
// Retrieve recipe data from MongoDB
exports.getRecipes = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Get recipes from MongoDB
    const recipes = yield recipeModel_1.Recipe.find();
    res.status(200).json(recipes);
}));
// POST:/api/recipe
// Post a new recipe to MongoDB
exports.createRecipe = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { recipeId, owner, recipeName, ingredients, recipeBody, tags } = req.body;
    if (!owner || !recipeName || !ingredients || !recipeBody) {
        res.status(400);
        throw new Error('Please add all fields');
    }
    // Create recipe
    const recipe = yield recipeModel_1.Recipe.create({
        recipeId,
        owner,
        recipeName,
        ingredients,
        recipeBody,
        likers: [],
        images: [],
        tags,
    });
    if (recipe) {
        res.status(201).json({
            _id: recipe._id,
            recipeId: recipe.recipeId,
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
// DELETE:/api/recipe
// Delete a recipe from MongoDB
exports.deleteRecipe = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get recipeId from request
        const { recipeId } = req.body;
        // Delete recipe
        const handleDeleteRecipe = () => __awaiter(void 0, void 0, void 0, function* () {
            yield recipeModel_1.Recipe.deleteOne({ recipeId: recipeId });
        });
        // Delete corresponding likes
        const handleDeleteLikes = () => __awaiter(void 0, void 0, void 0, function* () {
            yield likeModel_1.Like.deleteMany({ recipeId: recipeId });
        });
        const handleDelete = () => __awaiter(void 0, void 0, void 0, function* () {
            yield handleDeleteRecipe();
            yield handleDeleteLikes();
        });
        handleDelete();
    }
    catch (error) {
        res.status(400);
        new Error('Could not delete recipe');
    }
}));
// PUT:/api/recipe
// Like a recipe
exports.likeRecipe = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Get recipe and user objects from request
        const { recipe, user } = req.body;
        const recipeId = recipe.recipeId;
        const userId = user.userId;
        // updateLikes
        // Adds/removes entry to the table of likes
        const updateLikes = (recipeId, userId) => __awaiter(void 0, void 0, void 0, function* () {
            // find all documents named john and at least 18
            const likeEntry = yield likeModel_1.Like.find({
                userId: userId,
                recipeId: recipeId,
            }).exec();
            if (likeEntry.length === 0) {
                yield likeModel_1.Like.create({
                    userId: userId,
                    recipeId: recipeId,
                });
            }
            else if (likeEntry[0].userId) {
                yield likeModel_1.Like.deleteOne({
                    userId: userId,
                    recipeId: recipeId,
                });
            }
        });
        updateLikes(recipeId, userId);
        res.status(200).json({ id: req.params.id });
    }
    catch (error) {
        res.status(400);
        new Error('Could not like recipe');
    }
}));
