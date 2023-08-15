"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const router = express_1.default.Router();
// POST:/api/user/profile - Get user data object from MongoDB
router.post('/api/user/profile', userController_1.getUserProfile);
// POST:/api/user - Sync user auth object with MongoDB
router.post('/api/user', userController_1.syncUser);
// PUT:/api/user/recipes - Adds new recipe to user profile
router.put('/api/user/recipes', userController_1.addProfileRecipe);
// POST:/api/user/recipes - Get user recipe list from MongoDB
router.post('/api/user/recipes', userController_1.getUserRecipes);
// DELETE:/api/user/recipes - Removes recipe from user profile upon deletion
router.delete('/api/user/recipes', userController_1.removeProfileRecipe);
// DELETE:/api/user/profile - Delete user profile from MongoDB
router.delete('/api/user/profile', userController_1.deleteProfile);
// POST:/api/user/intro - Sets 'newUser' to false when user finishes profile creation
router.post('/api/user/intro', userController_1.newUserFalse);
// UNDER CONSTRUCTION ----------
// // DELETE:/api/user - Delete user account from Auth0
// router.delete('/api/user/', deleteAccount);
exports.default = router;
