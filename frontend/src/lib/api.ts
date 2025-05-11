import { Recipe, RecipeFromAPI, convertRecipeToAPI } from "./types";

// Updated base URL to match your backend structure
const API_BASE_URL = "http://localhost:8080"; // No /api/hello in your controller

export async function getAllRecipes(): Promise<Recipe[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/recipe/all`);

    if (!response.ok) {
      throw new Error(`Failed to fetch recipes: ${response.statusText}`);
    }

    const data = (await response.json()) as RecipeFromAPI[];
    return data as Recipe[];
  } catch (error) {
    console.error("Error fetching recipes:", error);
    return [];
  }
}

export async function getRecipeByTitle(title: string): Promise<Recipe | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/recipe/getRecipe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(title), // Make sure this matches what your backend expects
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch recipe: ${response.statusText}`);
    }

    const data = (await response.json()) as RecipeFromAPI;
    return data as Recipe;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    return null;
  }
}

export async function submitRecipe(recipe: Recipe): Promise<boolean> {
  try {
    const apiRecipe = convertRecipeToAPI(recipe);

    const response = await fetch(`${API_BASE_URL}/recipe/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apiRecipe),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error from server:", errorText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error submitting recipe:", error);
    return false;
  }
}

export async function deleteRecipe(title: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/recipe/deleteRecipe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(title),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error from server:", errorText);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error deleting recipe:", error);
    return false;
  }
}