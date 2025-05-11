
// import { useState } from "react";
// import { ArrowUp, ArrowDown } from "lucide-react";
// import { Recipe } from "@/lib/types";

// interface RecipeCardProps {
//   recipe: Recipe;
// }

// const RecipeCard = ({ recipe }: RecipeCardProps) => {
//   const [expanded, setExpanded] = useState(false);
//   const [votes, setVotes] = useState(recipe.votes);

//   // Parse ingredients if it's a string
//   const getIngredientsArray = () => {
//     try {
//       if (typeof recipe.ingredients === 'string') {
//         // Parse the JSON string
//         const ingredientsObj = JSON.parse(recipe.ingredients);
//         // Convert the object to an array of "key: value" strings
//         return Object.entries(ingredientsObj).map(
//           ([name, amount]) => `${name}: ${amount}`
//         );
//       } else if (typeof recipe.ingredients === 'object' && recipe.ingredients !== null) {
//         // If it's already an object but not an array
//         if (!Array.isArray(recipe.ingredients)) {
//           return Object.entries(recipe.ingredients).map(
//             ([name, amount]) => `${name}: ${amount}`
//           );
//         }
//         // If it's already an array
//         return recipe.ingredients;
//       }
//       // Fallback
//       return [];
//     } catch (error) {
//       console.error("Error parsing ingredients:", error);
//       return [];
//     }
//   };

//   // Parse steps if it's a string
//   const getStepsArray = () => {
//     try {
//       if (typeof recipe.steps === 'string') {
//         // Parse the JSON string
//         const stepsObj = JSON.parse(recipe.steps);
//         // If it's an object with numeric keys, convert to array
//         if (typeof stepsObj === 'object' && !Array.isArray(stepsObj)) {
//           return Object.values(stepsObj);
//         }
//         return Array.isArray(stepsObj) ? stepsObj : [];
//       } else if (Array.isArray(recipe.steps)) {
//         return recipe.steps;
//       }
//       // Fallback
//       return [];
//     } catch (error) {
//       console.error("Error parsing steps:", error);
//       return [];
//     }
//   };

//   // Parse tags if it's a string
//   const getTagsArray = () => {
//     try {
//       if (typeof recipe.tags === 'string') {
//         // Parse the JSON string
//         const tagsObj = JSON.parse(recipe.tags);
//         return Array.isArray(tagsObj) ? tagsObj : Object.values(tagsObj);
//       } else if (Array.isArray(recipe.tags)) {
//         return recipe.tags;
//       }
//       // Fallback
//       return [];
//     } catch (error) {
//       console.error("Error parsing tags:", error);
//       return [];
//     }
//   };

//   const ingredientsArray = getIngredientsArray();
//   const stepsArray = getStepsArray();
//   const tagsArray = getTagsArray();

//   const handleUpvote = () => {
//     setVotes(votes + 1);
//   };

//   const handleDownvote = () => {
//     setVotes(Math.max(0, votes - 1));
//   };

//   return (
//     <div className="bg-gray-200 text-black rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md">
//       <div className="p-6">
//         <h2 className="text-xl font-bold mb-2">{recipe.title}</h2>
//         <p className="text-gray-700 mb-4">{recipe.description}</p>

//         <div className="mb-4">
//           <h3 className="font-bold mb-2">Ingredients (1 serving):</h3>
//           <ul className="list-disc pl-5 space-y-1">
//             {ingredientsArray.map((ingredient, index) => (
//               <li key={index} className="text-gray-700">
//                 {ingredient}
//               </li>
//             ))}
//           </ul>
//         </div>

//         {expanded && (
//           <div className="mb-4">
//             <h3 className="font-bold mb-2">Steps:</h3>
//             <ol className="list-decimal pl-5 space-y-2">
//               {stepsArray.map((step, index) => (
//                 <li key={index} className="text-gray-700">
//                   {step}
//                 </li>
//               ))}
//             </ol>
//           </div>
//         )}

//         {expanded && (
//           <div className="mb-4">
//             <h3 className="font-bold mb-2">Tags:</h3>
//             <div className="flex flex-wrap gap-2">
//               {tagsArray.map((tag, index) => (
//                 <span
//                   key={index}
//                   className="bg-gray-300 px-3 py-1 rounded-full text-sm"
//                 >
//                   {tag}
//                 </span>
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="flex items-center justify-between mt-4">
//           <div className="flex items-center space-x-2">
//             <button
//               onClick={handleUpvote}
//               className="text-gray-700 hover:text-gray-900"
//             >
//               <ArrowUp className="h-5 w-5" />
//             </button>
//             <span>{votes}</span>
//             <button
//               onClick={handleDownvote}
//               className="text-gray-700 hover:text-gray-900"
//             >
//               <ArrowDown className="h-5 w-5" />
//             </button>
//           </div>

//           <button
//             onClick={() => setExpanded(!expanded)}
//             className="text-sm text-gray-600 hover:text-gray-900"
//           >
//             {expanded ? "show less" : "show more"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RecipeCard;

import { useState } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";
import { Recipe } from "@/lib/types";

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard = ({ recipe }: RecipeCardProps) => {
  const [expanded, setExpanded] = useState(false);
  const [votes, setVotes] = useState(recipe.votes);

  // Parse ingredients if it's a string
  const getIngredientsArray = () => {
    try {
      if (typeof recipe.ingredients === 'string') {
        // Parse the JSON string
        const ingredientsObj = JSON.parse(recipe.ingredients);
        // Convert the object to an array of "key: value" strings
        return Object.entries(ingredientsObj).map(
          ([name, amount]) => `${name}: ${amount}`
        );
      } else if (typeof recipe.ingredients === 'object' && recipe.ingredients !== null) {
        // If it's already an object but not an array
        if (!Array.isArray(recipe.ingredients)) {
          return Object.entries(recipe.ingredients).map(
            ([name, amount]) => `${name}: ${amount}`
          );
        }
        // If it's already an array
        return recipe.ingredients;
      }
      // Fallback
      return [];
    } catch (error) {
      console.error("Error parsing ingredients:", error);
      return [];
    }
  };

  // Parse steps if it's a string
  const getStepsArray = () => {
    try {
      if (typeof recipe.steps === 'string') {
        // Parse the JSON string
        const stepsObj = JSON.parse(recipe.steps);
        // If it's an object with numeric keys, convert to array
        if (typeof stepsObj === 'object' && !Array.isArray(stepsObj)) {
          return Object.values(stepsObj);
        }
        return Array.isArray(stepsObj) ? stepsObj : [];
      } else if (Array.isArray(recipe.steps)) {
        return recipe.steps;
      }
      // Fallback
      return [];
    } catch (error) {
      console.error("Error parsing steps:", error);
      return [];
    }
  };

  // Parse tags if it's a string
  const getTagsArray = () => {
    try {
      if (typeof recipe.tags === 'string') {
        // Parse the JSON string
        const tagsObj = JSON.parse(recipe.tags);
        return Array.isArray(tagsObj) ? tagsObj : Object.values(tagsObj);
      } else if (Array.isArray(recipe.tags)) {
        return recipe.tags;
      }
      // Fallback
      return [];
    } catch (error) {
      console.error("Error parsing tags:", error);
      return [];
    }
  };

  const ingredientsArray = getIngredientsArray();
  const stepsArray = getStepsArray();
  const tagsArray = getTagsArray();

  const handleUpvote = () => {
    setVotes(votes + 1);
  };

  const handleDownvote = () => {
    setVotes(Math.max(0, votes - 1));
  };

  return (
    <div className="bg-gray-100 text-black rounded-lg overflow-hidden shadow-sm">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2 text-center">{recipe.title}</h2>
        <p className="text-gray-700 mb-4 text-center">{recipe.description}</p>

        <div className="mb-4">
          <h3 className="font-bold mb-2">Ingredients (1 serving):</h3>
          <ul className="space-y-1">
            {ingredientsArray.map((ingredient, index) => (
              <li key={index} className="text-gray-700 flex items-start">
                <span className="mr-2">•</span>
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        {expanded && (
          <div className="mb-4">
            <h3 className="font-bold mb-2">Steps:</h3>
            <ol className="space-y-2">
              {stepsArray.map((step, index) => (
                <li key={index} className="text-gray-700">
                  <span className="font-bold mr-2">{index + 1}.</span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        )}

        {expanded && tagsArray.length > 0 && (
          <div className="mb-4">
            <h3 className="font-bold mb-2">Tags:</h3>
            <div className="flex flex-wrap gap-2">
              {tagsArray.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-200 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center space-x-1">
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