import mongoose, { model } from 'mongoose';

const { Schema } = mongoose;

// Create interface and schema to represent the ingredients object
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

// Create interface and schema to represent the steps object
export interface IRecipeSteps {
  step: string;
}

const RecipeStepsSchema = new Schema<IRecipeSteps>({
  step: { type: String, required: true },
});

// Create interface and schema to represent the stats object
export interface IRecipeStats {
  likes: number;
}

const RecipeStatsSchema = new Schema<IRecipeStats>({
  likes: { type: Number, required: false },
});

// Create interface and schema to represent the time object
export interface IRecipeTime {
  minutes: string;
  hours: string;
}

const RecipeTimeSchema = new Schema<IRecipeTime>({
  minutes: { type: String, required: true },
  hours: { type: String, required: true },
});

// Create an interface representing a document in MongoDB.
export interface IRecipe {
  recipeId: string;
  owner: string;
  recipeName: string;
  ingredients: IIngredients[];
  description: string;
  steps: IRecipeSteps[];
  images: string[];
  tags: string[];
  difficulty: string;
  time: IRecipeTime;
  stats: IRecipeStats;
}

// Create a Schema corresponding to the document interface.
export const RecipeSchema = new Schema<IRecipe>({
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
export const Recipe = model<IRecipe>('Recipe', RecipeSchema);
