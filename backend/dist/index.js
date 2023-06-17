"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = __importDefault(require("./routes"));
const connectToDb_1 = __importDefault(require("./utils/connectToDb"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8000;
// Middleware for handling JSON requests, called before the router
app.use(express_1.default.json());
// Express router
app.use(routes_1.default);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
// Start server on designated port
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
// Connect to DB
(0, connectToDb_1.default)();
