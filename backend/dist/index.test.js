"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
// Sample test to make sure vitest is working
(0, vitest_1.test)('should execute', () => {
    (0, vitest_1.expect)(1 + 1).toBe(2);
});
