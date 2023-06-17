"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const loginMiddleware_1 = __importDefault(require("../middleware/loginMiddleware"));
const router = express_1.default.Router();
router.post('/api/users', userController_1.registerUser);
router.get('/me', loginMiddleware_1.default, userController_1.getMe);
exports.default = router;
