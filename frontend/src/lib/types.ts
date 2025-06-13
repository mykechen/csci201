export interface Recipe {
  id?: number;
  userId: number;
  title: string;
  description: string;
  tags: string[];
  ingredients: string[];
  steps: string[];
  votes: number;
}

// This matches the RecipeResponse in your Java code
export interface RecipeFromAPI {
  id: number;
  userId: number;
  title: string;
  description: string;
  tags: string[];
  ingredients: string[];
  steps: string[];
  votes: number;
}

// Helper function to convert from frontend format to API format for submission
// Updated to match your backend's Recipe class structure
export function convertRecipeToAPI(recipe: Recipe): any {
  return {
    userID: recipe.userId,
    title: recipe.title, // Fixed capitalization (Title → title)
    tags: { tags: recipe.tags },
    description: recipe.description,
    ingredients: { ingredients: recipe.ingredients },
    instructions: { steps: recipe.steps },
  };
}