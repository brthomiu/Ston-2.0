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
exports.Recipe = exports.RecipeSchema = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const { Schema } = mongoose_1.default;
const IngredientSchema = new Schema({
    ingredient: { type: String, required: true },
    amount: { type: String, required: true },
    uom: { type: String, required: true },
});
const RecipeStepsSchema = new Schema({
    step: { type: String, required: true },
});
const RecipeStatsSchema = new Schema({
    likes: { type: Number, required: false },
});
const RecipeTimeSchema = new Schema({
    minutes: { type: String, required: true },
    hours: { type: String, required: true },
});
// Create a Schema corresponding to the document interface.
exports.RecipeSchema = new Schema({
    recipeId: { type: String, required: true, unique: true },
    owner: { type: String, required: true },
    recipeName: { type: String, required: true },
    ingredients: { type: [IngredientSchema], required: true },
    description: { type: String, required: true },
    steps: { type: [RecipeStepsSchema], required: true },
    images: { type: [String], required: false },
    tags: { type: [String], required: false },
    difficulty: { type: String, required: true },
    time: { type: RecipeTimeSchema, required: true },
    stats: { type: RecipeStatsSchema, required: false },
});
// 3. Create a Model.
exports.Recipe = (0, mongoose_1.model)('Recipe', exports.RecipeSchema);
