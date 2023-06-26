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
const express_openid_connect_1 = require("express-openid-connect");
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const oidSecret = process.env.OID_SECRET;
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: `${oidSecret}`,
    baseURL: 'http://localhost:8000',
    clientID: 'DIEeo2lgkNSzh1xW53Jq4i1UMePGXuqh',
    issuerBaseURL: 'https://dev-zwqft2uf5ljg5rdt.us.auth0.com',
};
const router = express_1.default.Router();
// Auth router attaches /login, /logout, and /callback routes to the baseURL
router.use((0, express_openid_connect_1.auth)(config));
// // GET:/login - Auth login route
// router.get('/login', (req, res) => {
//   res.cookie('auth0_compat', 'cookie_value', {
//     sameSite: 'none',
//     secure: true, // Make sure to set secure to true if using HTTPS
//   });
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });
// GET:/api/user - Get user auth object
router.get('/api/user', (0, express_openid_connect_1.requiresAuth)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        (0, userController_1.getUser)(req, res);
    }
    catch (error) {
        console.error('Error retrieving user profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
}));
// POST:/api/user - Sync user auth object with MongoDB
router.post('/api/user', (0, express_openid_connect_1.requiresAuth)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body; // User data is sent in the request body
        (0, userController_1.syncUser)(userData, res);
    }
    catch (error) {
        console.error('Error syncing with database:', error);
        res.status(500).json({ message: 'Server error' });
    }
}));
// DELETE:/api/user - Delete user account from MongoDB and from Auth0
router.delete('/api/user', (0, express_openid_connect_1.requiresAuth)(), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body; // User data is sent in the request body
        (0, userController_1.deleteUser)(userData, res);
    }
    catch (error) {
        console.error('Error syncing with database:', error);
        res.status(500).json({ message: 'Server error' });
    }
}));
exports.default = router;
