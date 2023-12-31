"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-extraneous-dependencies */
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const path = require("path");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./routes"));
const connectToDb_1 = require("./utils/connectToDb");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
// CORS Middleware
app.use((0, cors_1.default)({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
}));
// Middleware for handling JSON requests, called before the router
app.use(express_1.default.json());
// Add the cookie-parser middleware
app.use((0, cookie_parser_1.default)());
// Express router
app.use(routes_1.default);
// Serve frontend
app.use(express_1.default.static(path.join(__dirname, '../../frontend/dist')));
app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, '../', '../', 'frontend', 'dist', 'index.html')));
// Start server on designated port
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
// Connect to DB
(0, connectToDb_1.connectToDb)();
