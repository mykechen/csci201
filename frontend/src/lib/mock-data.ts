import { Recipe } from "./types";

// Mock data for initial development
export const mockRecipes: Recipe[] = [
  {
    userId: 1,
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
    votes: 0,
  },
  {
    userId: 2,
    title: "Simple Avocado Toast",
    description:
      "A quick and nutritious breakfast or snack featuring creamy avocado on crispy toast with customizable toppings.",
    ingredients: [
      "1 ripe avocado",
      "2 slices of bread (sourdough works well)",
      "1 tbsp olive oil",
      "1 tbsp lemon juice",
      "Salt and pepper to taste",
      "Optional toppings: red pepper flakes, everything bagel seasoning, or a poached egg",
    ],
    steps: [
      "Toast the bread slices until golden and crisp.",
      "Cut the avocado in half, remove the pit, and scoop the flesh into a bowl.",
      "Mash the avocado with a fork, adding lemon juice, salt, and pepper.",
      "Spread the avocado mixture onto the toast.",
      "Add your preferred toppings and enjoy immediately!",
    ],
    tags: ["Vegetarian", "Vegan", "Breakfast", "Quick"],
    votes: 0,
  },
];
