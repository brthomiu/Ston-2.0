"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.userSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const { Schema } = mongoose_1.default;
// Create a Schema corresponding to the stats interface.
const userStatsSchema = new Schema({
    likes: { type: Number, required: false },
    recipes: { type: Number, required: false },
    follows: { type: Number, required: false },
    followers: { type: Number, required: false },
    recipeLikes: { type: Number, required: false },
});
// Create a Schema correspondinsg to the document interface.
exports.userSchema = new Schema({
    userId: { type: String, required: true, unique: true },
    name: { type: String, required: true, unique: true },
    displayName: { type: String, required: false },
    email: { type: String, required: true },
    description: { type: String, required: false },
    private: { type: Boolean, required: false },
    newUser: { type: Boolean, required: false },
    stats: { type: userStatsSchema, required: false },
});
// Create a Model.
exports.User = (0, mongoose_1.model)('User', exports.userSchema);
