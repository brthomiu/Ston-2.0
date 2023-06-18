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
const mongoose_1 = __importDefault(require("mongoose"));
const vitest_1 = require("vitest");
const connectToDb_1 = __importDefault(require("./utils/connectToDb"));
(0, vitest_1.describe)('Server Connection to MongoDB', () => {
    (0, vitest_1.beforeAll)(() => {
        // Connect to a mock MongoDB server
        const mongoUri = 'mongodb://localhost:27017/testdb';
        mongoose_1.default.connect = vitest_1.vi.fn().mockResolvedValue(undefined); // Mock the connect function
        process.env.TEST_DB_URI = mongoUri;
    });
    (0, vitest_1.afterAll)(() => {
        // Disconnect from the mock MongoDB server
        mongoose_1.default.disconnect();
    });
    (0, vitest_1.it)('should connect to the database', () => __awaiter(void 0, void 0, void 0, function* () {
        // Call the connectToDb function
        yield (0, connectToDb_1.default)();
        // Expect the mongoose.connect function to have been called with the correct URI
        (0, vitest_1.expect)(mongoose_1.default.connect).toHaveBeenCalledWith(process.env.TEST_DB_URI);
    }));
});
