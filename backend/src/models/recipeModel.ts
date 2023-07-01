import mongoose, { model } from 'mongoose';

const { Schema } = mongoose;

// Create an interface representing a document in MongoDB.
export interface IRecipe {
  owner: string;
  recipeName: string;
  ingredients: IIngredients[];
  recipeBody: string;
  likers: string[];
  image: string;
}

// Create an interface representing the ingredients object
export interface IIngredients {
  ingredient: string;
  amount: string;
  uom: string;
}

// Create a Schema correspondinsg to the document interface.
export const RecipeSchema = new Schema<IRecipe>({
  owner: { type: String, required: true },
  recipeName: { type: String, required: true, unique: true },
  ingredients: { type: [String], required: true },
  recipeBody: { type: String, required: true },
  likers: { type: [String], required: false },
  image: { type: String, required: false },
});

// 3. Create a Model.
export const Recipe = model<IRecipe>('Recipe', RecipeSchema);
