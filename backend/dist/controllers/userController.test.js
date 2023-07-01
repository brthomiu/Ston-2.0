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
const vitest_1 = require("vitest");
const userController_1 = require("./userController");
(0, vitest_1.describe)('getUserProfile', () => {
    (0, vitest_1.it)('should return the user object from req.oidc.user', () => {
        const req = {
            oidc: {
                user: {
                    sub: 'user123',
                    name: 'John Doe',
                    email: 'john@example.com',
                },
            },
        };
        const res = {
            json: vitest_1.vi.fn(),
        };
        const next = vitest_1.vi.fn();
        (0, userController_1.getUserProfile)(req, res, next);
        (0, vitest_1.expect)(res.json).toHaveBeenCalledWith({
            userId: 'user123',
            name: 'John Doe',
            email: 'john@example.com',
        });
    });
    (0, vitest_1.it)('should throw an error if req.oidc.user is not present', () => {
        const req = {
            oidc: {
                user: null,
            },
        };
        const res = {
            json: vitest_1.vi.fn(),
        };
        vitest_1.test.fails('fail test', () => __awaiter(void 0, void 0, void 0, function* () {
            const next = vitest_1.vi.fn();
            (0, vitest_1.expect)(() => (0, userController_1.getUserProfile)(req, res, next)).toThrow('Failed to find authorized user');
            (0, vitest_1.expect)(res.json).not.toHaveBeenCalled();
        }));
    });
});
