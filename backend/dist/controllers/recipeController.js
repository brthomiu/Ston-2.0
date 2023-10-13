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
exports.uploadRecipeImage = exports.likeRecipe = exports.deleteRecipe = exports.createRecipe = exports.getRecipes = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const recipeModel_1 = require("../models/recipeModel");
const likeModel_1 = require("../models/likeModel");
const userModel_1 = require("../models/userModel");
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const imageModel_1 = require("../models/imageModel");
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
    // Get data from request
    const { recipeId, owner, recipeName, ingredients, description, tags, difficulty, time, steps, images, } = req.body.recipe;
    const userName = req.body.user.name;
    const stats = req.body.user.stats;
    // Check that recipe object contains all fields
    if (!owner ||
        !recipeName ||
        !ingredients ||
        !description ||
        !steps ||
        !difficulty ||
        !time ||
        !images) {
        res.status(400);
        throw new Error('Please add all fields');
    }
    // Create recipe
    const recipe = yield recipeModel_1.Recipe.create({
        recipeId,
        owner,
        recipeName,
        ingredients,
        description,
        steps,
        likers: [],
        images,
        tags,
        difficulty,
        time,
        stats: { likes: 0 },
    });
    // handleUserRecipesStat
    // Increment user recipe stat
    const handleUserRecipesStat = (userName, stats) => __awaiter(void 0, void 0, void 0, function* () {
        // Create a new stats object
        const newStats = Object.assign({}, stats);
        // Increment the new stats object
        newStats.recipes += 1;
        // Filters for mongoose search
        const filter = { name: owner };
        const update = { stats: newStats };
        // Update DB with incremented stats
        yield userModel_1.User.findOneAndUpdate(filter, update, {
            new: true,
        });
    });
    if (recipe) {
        handleUserRecipesStat(userName, stats);
        res.status(201).json({
            _id: recipe._id,
            recipeId: recipe.recipeId,
            owner: recipe.owner,
            recipeName: recipe.recipeName,
            ingredients: recipe.ingredients,
            description: recipe.description,
            steps: recipe.steps,
            tags: recipe.tags,
            difficulty: recipe.difficulty,
            time: recipe.time,
            images: recipe.images,
            stats: recipe.stats,
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
        // Get data from request
        const recipeId = req.body.userAndRecipe.recipe.recipeId;
        const owner = req.body.userAndRecipe.user.name;
        const stats = req.body.userAndRecipe.user.stats;
        // Delete recipe
        const handleDeleteRecipe = () => __awaiter(void 0, void 0, void 0, function* () {
            yield recipeModel_1.Recipe.deleteOne({ recipeId: recipeId });
        });
        // Delete corresponding likes
        const handleDeleteLikes = () => __awaiter(void 0, void 0, void 0, function* () {
            yield likeModel_1.Like.deleteMany({ recipeId: recipeId });
        });
        // handleUserRecipesStat
        // Decrement user recipe stat
        const handleUserRecipesStat = () => __awaiter(void 0, void 0, void 0, function* () {
            // Create a new stats object
            const newStats = Object.assign({}, stats);
            // Increment the new stats object
            newStats.recipes -= 1;
            // Filters for mongoose search
            const filter = { name: owner };
            const update = { stats: newStats };
            // Update DB with incremented stats
            yield userModel_1.User.findOneAndUpdate(filter, update, {
                new: true,
            });
        });
        // Handler for all of the delete functions
        const handleDelete = () => __awaiter(void 0, void 0, void 0, function* () {
            yield handleUserRecipesStat();
            yield handleDeleteRecipe();
            yield handleDeleteLikes();
        });
        // Call the delete handler
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
            // Check to see if the user/recipe has an entry in the like table
            const likeEntry = yield likeModel_1.Like.find({
                userId: userId,
                recipeId: recipeId,
            }).exec();
            // If the entry does not exist, create it, if it does, delete it
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
        // Call updateLikes
        updateLikes(recipeId, userId);
        res.status(200).json({ id: req.params.id });
    }
    catch (error) {
        res.status(400);
        new Error('Could not like recipe');
    }
}));
// POST:/api/recipe/image - Upload recipe image to MongoDB
// uploadRecipeImage - Gets the image file from the HTTP request and uploads it to MongoDB
exports.uploadRecipeImage = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Settings for multer
    const storage = multer_1.default.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/'); // Output path
        },
        filename: function (req, file, cb) {
            const uniquePrefix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, uniquePrefix + '-' + file.originalname); // Filenames with unique ID added
        },
    });
    // Initialize multer
    const upload = (0, multer_1.default)({ storage: storage });
    upload.single('image')(req, res, function (err) {
        return __awaiter(this, void 0, void 0, function* () {
            if (err) {
                return res.status(400).send('Could not upload image to server!');
            }
            const imageId = req.body.imageId;
            const fileName = req.file.filename;
            console.log('imageId-----------------------', imageId);
            try {
                const imageData = {
                    imageId: imageId,
                    image: fs_1.default.readFileSync(`./uploads/${fileName}`),
                };
                yield imageModel_1.Image.create(imageData);
                res.status(200).send('Image uploaded to DB successfully!');
            }
            catch (error) {
                console.error(error); // Log the error for debugging
                res.status(500).send('Could not upload image to DB!');
            }
        });
    });
}));
