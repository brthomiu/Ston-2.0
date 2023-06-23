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
exports.deleteUser = exports.syncUser = exports.getUser = void 0;
const userModel_1 = require("../models/userModel");
const connectToDb_1 = require("../utils/connectToDb");
// GET:/api/user - Retrieve user auth object and sync to mongoDB
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check for auth0 user object
    if (!req.oidc.user) {
        console.log(`getUser failed stage 1, req.oidc.user:${req.oidc.user}`);
        throw new Error('Failed to find authorized user');
    }
    // Return current user object
    const user = {
        userId: req.oidc.user.sub,
        name: req.oidc.user.name,
        email: req.oidc.user.email,
        // Add any other desired fields from Auth0's user object
    };
    console.log(`getUser passed stage 1, req.oidc.user:${req.oidc.user}`);
    res.json(user);
});
exports.getUser = getUser;
// POST:/api/user - Sync Auth0 user object with MongoDB
const syncUser = (userData, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Check for auth0 user object
    if (!userData) {
        throw new Error('Failed to find authorized user');
    }
    // Get user ID from auth0 and check if user already exists in MongoDB
    const userId = userData.userId;
    const name = userData.name;
    const email = userData.email;
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
const deleteUser = (userData, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = userData.userId;
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
