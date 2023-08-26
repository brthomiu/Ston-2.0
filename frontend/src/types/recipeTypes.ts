import { Dispatch, SetStateAction } from 'react';
import { IUserDBData } from './authTypes';

// Interface for recipe stats
export interface IRecipeStats {
  likes: number;
}

// Interface for recipe steps
export interface IRecipeSteps {
  step: string;
}

// Interface for recipe time
export interface IRecipeTime {
  minutes: string;
  hours: string;
}

// Interface for recipe object
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

// Interface representing the ingredients object
export interface IIngredients {
  ingredient: string;
  amount: string;
  uom: string;
}

// IUserAndRecipe
// Type interface for like request object
export interface IUserAndRecipe {
  recipe: IRecipe;
  user: IUserDBData;
}

// Interface representing recipe form props
export interface IRecipeProps {
  ingredientList: IIngredients[];
  setIngredientList: Dispatch<SetStateAction<IIngredients[]>>;
  tagList: string[];
  setTagList: (tags: string[]) => void;
  stepList: IRecipeSteps[];
  setStepList: Dispatch<SetStateAction<IRecipeSteps[]>>;
  stepObject: IRecipeSteps;
  setStepObject: Dispatch<SetStateAction<IRecipeSteps>>;
  timeObject: IRecipeTime;
  setTimeObject: Dispatch<SetStateAction<IRecipeTime>>;
  difficultySelection: string;
  setDifficultySelection: React.Dispatch<React.SetStateAction<string>>;
}

export interface IIngredientProps {
  ingredientObject: IIngredients;
  setIngredientObject: Dispatch<SetStateAction<IIngredients>>;
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
