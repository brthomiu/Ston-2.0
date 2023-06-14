"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("./src/index"));
const server = index_1.default.listen(3000, () => {
    console.log(`This is running on port 3000`);
});
exports.default = server;
