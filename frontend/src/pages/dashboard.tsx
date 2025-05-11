import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, ChevronDown } from "lucide-react";
import type { Metadata } from "next";
import RecipeCard from "@/components/recipe-card";
import { mockRecipes } from "@/lib/mock-data";
import { Recipe } from "@/lib/types";
import { getAllRecipes } from "@/lib/api";

export const metadata: Metadata = {
  title: "Trojan Bites",
  description: "Discover and share delicious recipes",
};

// Feed options type
type FeedOption = "Latest" | "Popular" | "My Recipes";

export default function Dashboard() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [feedOption, setFeedOption] = useState<FeedOption>("Latest");

  // Fetch recipes when component mounts
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const data = await getAllRecipes();
        setRecipes(data);
        setError(null);
      } catch (err) {
        console.error("Failed to fetch recipes:", err);
        setError("Failed to load recipes. Please try again later.");
        // Use mock data as fallback
        setRecipes(mockRecipes);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes();
  }, []);

  // Filter recipes based on feed option
  const filteredRecipes = () => {
    switch (feedOption) {
      case "Popular":
        return [...recipes].sort((a, b) => b.votes - a.votes);
      case "My Recipes":
        // Replace with actual user ID when authentication is implemented
        const currentUserId = 1; // Placeholder
        return recipes.filter((recipe) => recipe.userId === currentUserId);
      case "Latest":
      default:
        // Assuming newer recipes have higher IDs
        return [...recipes].sort((a, b) => (b.id || 0) - (a.id || 0));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl text-red-700 font-bold text-center">
            TROJAN BITES
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="bg-gray-200 text-black">
                {feedOption} <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setFeedOption("Latest")}>
                Latest
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFeedOption("Popular")}>
                Popular
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setFeedOption("My Recipes")}>
                My Recipes
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="outline"
            className="bg-gray-200 text-black p-2 rounded-lg"
          >
            <Plus className="h-6 w-6" />
          </Button>
        </div>
        {/* Loading state */}
        {loading && <div className="text-center py-8 text-black">Loading recipes...</div>}


        {/* Error state */}
        {error && <div className="text-center py-8 text-red-500">{error}</div>}


        {/* Recipe cards */}
        <div className="space-y-4">
          {filteredRecipes().map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </main>
    </div>
  );
}