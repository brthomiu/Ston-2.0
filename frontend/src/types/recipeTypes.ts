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
