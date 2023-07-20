import { Dispatch, SetStateAction } from 'react';

// Create an interface representing a document in MongoDB.
export interface IRecipe {
  recipeId: string;
  owner: string;
  recipeName: string;
  ingredients: IIngredients[];
  recipeBody: string;
  likers: string[];
  images: string[];
  tags: string[];
}

// Create an interface representing the ingredients object
export interface IIngredients {
  ingredient: string;
  amount: string;
  uom: string;
}

// Create an interface representing recipe form props
export interface IRecipeProps {
  ingredientList: IIngredients[];
  setIngredientList: Dispatch<SetStateAction<IIngredients[]>>;
  tagList: string[];
  setTagList: (tags: string[]) => void;
}

export interface IIngredientProps {
  ingredientObject: IIngredients;
  setIngredientObject: Dispatch<SetStateAction<IIngredients>>;
}

export interface RecipeCardProps {
  recipe: IRecipe;
}

export interface IngredientProps {
  ingredient: IIngredients;
}

export interface TagProps {
  tag: string;
}

export interface TagObjectProps {
  setTagObject: Dispatch<SetStateAction<string>>;
}
