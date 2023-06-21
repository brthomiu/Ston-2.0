"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/no-extraneous-dependencies */
const express_openid_connect_1 = require("express-openid-connect");
const express_1 = __importDefault(require("express"));
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
// auth router attaches /login, /logout, and /callback routes to the baseURL
router.use((0, express_openid_connect_1.auth)(config));
// GET req.isAuthenticated is provided from the auth router
router.get('/login', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});
// GET return user profile
router.get('/profile', (0, express_openid_connect_1.requiresAuth)(), (req, res) => {
    res.send(JSON.stringify(req.oidc.user));
});
exports.default = router;
