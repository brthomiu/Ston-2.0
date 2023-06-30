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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.syncUser = exports.getUserProfile = void 0;
const userModel_1 = require("../models/userModel");
const connectToDb_1 = require("../utils/connectToDb");
// POST:/api/user/profile - Retrieve user profile from MongoDB
const getUserProfile = (user, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Find matching user in MongoDB
    const userProfile = yield userModel_1.User.find({
        userId: user.sub,
    }).exec();
    console.log('userController getUserProfile userProfile: ', userProfile);
    if (!userProfile) {
        throw new Error('POST:/api/user/profile - Failed to retrieve user profile');
    }
    res.json(userProfile); // Return user profile data
});
exports.getUserProfile = getUserProfile;
// POST:/api/user - Sync Auth0 user object with MongoDB
const syncUser = (user, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check for auth0 user object
    if (!user.sub) {
        throw new Error('POST:/api/user - Failed to find authorized user');
    }
    // Get user ID from auth0 and check if user already exists in MongoDB
    const userId = user.sub;
    const name = user.name;
    const email = user.email;
    const currentUser = yield connectToDb_1.db.collection('users').findOne({ userId });
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
});
exports.syncUser = syncUser;
// DELETE:/api/user - Delete user account from MongoDB and from Auth0
const deleteUser = (user, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = user.sub;
        // Delete user account from MongoDB
        yield connectToDb_1.db.collection('users').deleteOne({ userId });
        // Optionally, you can also implement the deletion of the user account from Auth0 here
        res.status(200).json({ message: 'User deleted successfully' });
    }
    catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
exports.deleteUser = deleteUser;
