import { useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Recipe } from "@/lib/types";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
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

export default RecipeCard;
