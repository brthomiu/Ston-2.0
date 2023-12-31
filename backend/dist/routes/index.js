"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoutes_1 = __importDefault(require("./userRoutes"));
const recipeRoutes_1 = __importDefault(require("./recipeRoutes"));
const router = express_1.default.Router();
router.get('/healthcheck', (_, res) => res.sendStatus(200));
router.use(userRoutes_1.default, recipeRoutes_1.default);
exports.default = router;
