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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = require("jsonwebtoken");
const vitest_1 = require("vitest");
const userController_1 = require("./userController");
const userModel_1 = require("../models/userModel");
vitest_1.vi.mock('bcryptjs');
vitest_1.vi.mock('jsonwebtoken');
(0, vitest_1.describe)('User Controller', () => {
    let req;
    let res;
    (0, vitest_1.beforeEach)(() => {
        req = {};
        res = {};
        req.body = {}; // Set the request body as needed for each test
    });
    (0, vitest_1.describe)('registerUser', () => {
        (0, vitest_1.it)('should create a new user and return the user data with a token', () => __awaiter(void 0, void 0, void 0, function* () {
            req.body = {
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password',
            };
            const mockUser = {
                _id: 'user-id',
                name: 'John Doe',
                email: 'john@example.com',
            };
            userModel_1.User.findOne = vitest_1.vi.fn().mockResolvedValue(null);
            userModel_1.User.create = vitest_1.vi.fn().mockResolvedValue(mockUser);
            const mockToken = 'mockToken';
            bcryptjs_1.default.genSalt.mockResolvedValue('salt');
            bcryptjs_1.default.hash.mockResolvedValue('hashedPassword');
            jsonwebtoken_1.sign.mockReturnValue(mockToken);
            res.status = vitest_1.vi.fn().mockReturnThis();
            res.json = vitest_1.vi.fn();
            yield (0, userController_1.registerUser)(req, res);
            (0, vitest_1.expect)(userModel_1.User.findOne).toHaveBeenCalledWith({ email: req.body.email });
            (0, vitest_1.expect)(userModel_1.User.create).toHaveBeenCalledWith({
                name: req.body.name,
                email: req.body.email,
                password: 'hashedPassword',
                description: vitest_1.expect.any(String),
                private: false,
                recipes: [],
                favorites: [],
            });
            (0, vitest_1.expect)(res.status).toHaveBeenCalledWith(201);
            (0, vitest_1.expect)(res.json).toHaveBeenCalledWith({
                _id: mockUser._id,
                name: mockUser.name,
                email: mockUser.email,
                token: mockToken,
            });
        }));
    });
    // Add more test cases for different scenarios
    (0, vitest_1.describe)('loginUser', () => {
        (0, vitest_1.it)('should authenticate a user and return user data with a token', () => __awaiter(void 0, void 0, void 0, function* () {
            req.body = {
                email: 'john@example.com',
                password: 'password',
            };
            const mockUser = {
                _id: 'user-id',
                name: 'John Doe',
                email: 'john@example.com',
                password: 'hashedPassword',
            };
            userModel_1.User.findOne = vitest_1.vi.fn().mockResolvedValue(mockUser);
            bcryptjs_1.default.compare.mockResolvedValue(true);
            const mockToken = 'mockToken';
            jsonwebtoken_1.sign.mockReturnValue(mockToken);
            res.json = vitest_1.vi.fn();
            yield (0, userController_1.loginUser)(req, res);
            (0, vitest_1.expect)(userModel_1.User.findOne).toHaveBeenCalledWith({ email: req.body.email });
            (0, vitest_1.expect)(bcryptjs_1.default.compare).toHaveBeenCalledWith(req.body.password, mockUser.password);
            (0, vitest_1.expect)(res.json).toHaveBeenCalledWith({
                _id: mockUser._id,
                name: mockUser.name,
                email: mockUser.email,
                token: mockToken,
            });
        }));
    });
});
