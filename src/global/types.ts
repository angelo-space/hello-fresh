export type StepType = {
  number: number;
  step: string;
};

export type InstructionType = {
  steps: Array<StepType>;
};

export type IngredientType = {
  id: number;
  original: string;
};

export type RecipeType = {
  id: number;
  image: string;
  title: string;
  summary: string;
  extendedIngredients: Array<IngredientType>;
  analyzedInstructions: Array<InstructionType>;
};

export type RecipeComponentType = {
  recipes: Array<RecipeType>;
  origin: string;
};

export type RecipeDetailsComponentType = {
  viewRecipe: RecipeType;
  modalBehavior: React.Dispatch<React.SetStateAction<boolean>>;
  nutriImg: string;
};
