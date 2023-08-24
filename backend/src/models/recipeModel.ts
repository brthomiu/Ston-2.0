import mongoose, { model } from 'mongoose';

const { Schema } = mongoose;

// Create an interface representing the ingredients object
export interface IIngredients {
  ingredient: string;
  amount: string;
  uom: string;
}

const IngredientSchema = new Schema<IIngredients>({
  ingredient: { type: String, required: true },
  amount: { type: String, required: true },
  uom: { type: String, required: true },
});

// Create an interface representing the stats object
export interface IRecipeStats {
  likes: number;
}

const RecipeStatsSchema = new Schema<IRecipeStats>({
  likes: { type: Number, required: false }
});

// Create an interface representing a document in MongoDB.
export interface IRecipe {
  recipeId: string;
  owner: string;
  recipeName: string;
  ingredients: IIngredients[];
  description: string;
  images: string[];
  tags: string[];
  stats: IRecipeStats;
}

// Create a Schema corresponding to the document interface.
export const RecipeSchema = new Schema<IRecipe>({
  recipeId: { type: String, required: true, unique: true },
  owner: { type: String, required: true },
  recipeName: { type: String, required: true },
  ingredients: { type: [IngredientSchema], required: true },
  description: { type: String, required: true },
  images: { type: [String], required: false },
  tags: { type: [String], required: false },
  stats: { type: RecipeStatsSchema, required: false },

});

// 3. Create a Model.
export const Recipe = model<IRecipe>('Recipe', RecipeSchema);
