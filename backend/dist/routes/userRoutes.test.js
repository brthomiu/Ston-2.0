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
/* eslint-disable import/no-extraneous-dependencies */
const supertest_1 = __importDefault(require("supertest"));
const express_1 = __importDefault(require("express"));
const vitest_1 = require("vitest");
const userRoutes_1 = __importDefault(require("./userRoutes"));
const app = (0, express_1.default)();
app.use('/', userRoutes_1.default);
(0, vitest_1.describe)('Authentication Routes', () => {
    (0, vitest_1.it)('should respond with user profile when user is authenticated', () => __awaiter(void 0, void 0, void 0, function* () {
        // Simulate an authenticated user
        const agent = supertest_1.default.agent(app);
        // Perform login
        yield agent.get('/login');
        // Make a GET request to the profile route
        const response = yield agent.get('/profile');
        // Assert that the response contains the user profile
        (0, vitest_1.expect)(response.body).toEqual({
        /* Expected user profile object */
        });
    }));
});
