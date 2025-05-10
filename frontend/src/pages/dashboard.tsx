import { useState } from "react";
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

export const metadata: Metadata = {
  title: "Trojan Bites",
  description: "Discover and share delicious recipes",
};

// Feed options type
type FeedOption = "Latest" | "Popular" | "My Recipes";

export default function Dashboard() {
  const [recipes, setRecipes] = useState<Recipe[]>(mockRecipes);
  const [feedOption, setFeedOption] = useState<FeedOption>("Latest");

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
                Feed Options <ChevronDown className="ml-2 h-4 w-4" />
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

        {/* Recipe cards */}
        <div className="space-y-4">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))}
        </div>
      </main>
    </div>
  );
}