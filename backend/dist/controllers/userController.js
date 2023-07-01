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
exports.deleteProfile = exports.syncUser = exports.getUserProfile = void 0;
/* eslint-disable import/no-extraneous-dependencies */
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = require("../models/userModel");
// POST:/api/user/profile
// Retrieve user profile from MongoDB
exports.getUserProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sub } = req.body;
    // Find matching user in MongoDB
    const userProfile = yield userModel_1.User.find({
        userId: sub,
    }).exec();
    if (!userProfile) {
        res.status(404);
        throw new Error('Failed to retrieve user profile');
    }
    res.json(userProfile); // Return user profile data
}));
// POST:/api/user
// Sync Auth0 user object with MongoDB
exports.syncUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sub, name, email } = req.body;
    // Check for auth0 user object
    if (!sub) {
        res.status(400);
        throw new Error('Failed to find authorized user');
    }
    // Get user ID from auth0 and check if user already exists in MongoDB
    const userId = sub;
    const currentUser = yield userModel_1.User.findOne({ userId });
    // Create a user object if there is not a match in MongoDB
    if (!currentUser) {
        yield userModel_1.User.create({
            userId,
            name,
            email,
            description: `${name} has not created a profile yet.`,
            private: false,
            recipes: [],
            favorites: [],
        });
        // Send a response indicating the user has been synced
        res.status(201).json({ message: 'User synced successfully' });
    }
    else {
        // Send a response indicating the user already exists
        res.status(200).json({ message: 'User already exists' });
    }
}));
// DELETE:/api/user/profile
// Delete user account from MongoDB
exports.deleteProfile = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { sub } = req.body;
    try {
        // Delete user account from MongoDB
        yield userModel_1.User.deleteOne({ userId: sub });
        // Send a response indicating the profile has been deleted
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        res.status(500);
        throw new Error('Error deleting user');
    }
}));
// // UNDER CONSTRUCTION
// // DELETE:/api/user
// // Delete user account from MongoDB and from Auth0
// export const deleteAccount = expressAsyncHandler(async (req, res) => {
//   try {
//     // Implement the deletion of the user account from Auth0 here
//     res.status(200).json({ message: 'Account deleted successfully' });
//   } catch (error) {
//     res.status(500);
//     throw new Error('Error deleting account');
//   }
// });
