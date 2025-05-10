import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, ChevronDown, ArrowUp, ArrowDown } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Trojan Bites",
  description: "Discover and share delicious recipes",
};

// Define TypeScript interfaces
interface Recipe {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  steps: string[];
  tags: string[];
  votes: number;
}

// Mock data for initial development
const mockRecipes: Recipe[] = [
  {
    id: 1,
    title: "Garlic Butter Lemon Pasta",
    description:
      "A simple yet flavorful pasta dish featuring a rich garlic butter sauce, bright lemon zest, and a hint of spice—a perfect balance of comfort and freshness.",
    ingredients: [
      "4 oz (½ cup) spaghetti or linguine",
      "1 tbsp unsalted butter (or olive oil for a vegan option)",
      "2 cloves garlic, minced",
      "¼ tsp red pepper flakes (optional)",
      "1 tbsp fresh lemon juice (about ¼ of a lemon)",
      "¼ cup reserved pasta water",
      "2 tbsp grated Parmesan cheese (or nutritional yeast for vegan option)",
      "1 tbsp chopped fresh parsley",
      "Salt and black pepper to taste",
    ],
    steps: [
      "Bring a pot of salted water to a boil and cook the pasta until al dente. Reserve ¼ cup of pasta water before draining.",
      "In a pan over medium heat, melt the butter (or heat olive oil). Add minced garlic and red pepper flakes, cooking for about 1 minute until fragrant.",
      "Stir in the lemon juice and half of the reserved pasta water. Let simmer for 1 minute.",
      "Add the drained pasta to the pan and toss to coat in the sauce. Gradually mix in the Parmesan cheese (or nutritional yeast), adding more pasta water as needed to create a smooth sauce.",
      "Season with salt and black pepper to taste. Remove from heat and garnish with fresh parsley.",
      "Serve hot and enjoy!",
    ],
    tags: ["Vegetarian", "Dairy", "Wheat/Gluten"],
    votes: 20,
  },
  // More mock recipes would go here
];

// Feed options type
type FeedOption = "Latest" | "Popular" | "My Recipes";

// Recipe Card Component
const RecipeCard = ({ recipe }: { recipe: Recipe }) => {
  const [expanded, setExpanded] = useState(false);
  const [votes, setVotes] = useState(recipe.votes);

  const handleUpvote = () => {
    setVotes(votes + 1);
  };

  const handleDownvote = () => {
    setVotes(Math.max(0, votes - 1));
  };

  return (
    <div className="bg-gray-200 text-black rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
        <p className="text-gray-700 mb-4">{recipe.description}</p>

        <div className="mb-4">
          <h3 className="font-bold mb-2">Ingredients (1 serving):</h3>
          <ul className="list-disc pl-5 space-y-1">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="text-gray-700">
                {ingredient}
              </li>
            ))}
          </ul>
        </div>

        {expanded && (
          <div className="mb-4">
            <h3 className="font-bold mb-2">Steps:</h3>
            <ol className="list-decimal pl-5 space-y-2">
              {recipe.steps.map((step, index) => (
                <li key={index} className="text-gray-700">
                  {step}
                </li>
              ))}
            </ol>
          </div>
        )}

        {expanded && (
          <div className="mb-4">
            <h3 className="font-bold mb-2">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {recipe.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-300 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-2">
            <button
              onClick={handleUpvote}
              className="text-gray-700 hover:text-gray-900"
            >
              <ArrowUp className="h-5 w-5" />
            </button>
            <span>{votes}</span>
            <button
              onClick={handleDownvote}
              className="text-gray-700 hover:text-gray-900"
            >
              <ArrowDown className="h-5 w-5" />
            </button>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            {expanded ? "show less" : "show more"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default function Dashboard() {
  const [recipes, setRecipes] = useState<Recipe[]>(mockRecipes);
  const [feedOption, setFeedOption] = useState<FeedOption>("Latest");

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <h1 className="text-2xl text-red-700 font-bold text-center">TROJAN BITES</h1>
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

          <Button variant="outline" className="bg-gray-200 text-black p-2 rounded-lg">
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
