import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const dietaryOptions = ["Vegan", "Halal", "Gluten-Free", "Nut-Free"];

export default function SubmitRecipePage() {
  const [formData, setFormData] = useState({
    userID: "nbhargav@usc.edu", // Pre-fill with the desired email
    title: "",
    tags: [] as string[],
    description: "",
    ingredients: [{ item: "", amount: "" }],
    instructions: "",
  });

  const router = useRouter();

  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTagToggle = (tag: string) => {
    setFormData((prev) => {
      const tags = prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag];
      return { ...prev, tags };
    });
  };

  const handleIngredientChange = (
    index: number,
    field: "item" | "amount",
    value: string
  ) => {
    const updated = [...formData.ingredients];
    updated[index][field] = value;
    setFormData((prev) => ({ ...prev, ingredients: updated }));
  };

  const addIngredientRow = () => {
    setFormData((prev) => ({
      ...prev,
      ingredients: [...prev.ingredients, { item: "", amount: "" }],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create ingredients object in the same format as the ramen recipe
    const ingredientsObj: { [key: string]: string } = {};
    formData.ingredients
      .filter((i) => i.item.trim() && i.amount.trim())
      .forEach((ingredient) => {
        // Use the ingredient item as the key and amount as the value
        ingredientsObj[ingredient.item.trim().toLowerCase()] =
          ingredient.amount.trim();
      });

    // Create instructions object with numbered keys like the ramen recipe
    const instructionsObj: { [key: string]: string } = {};
    const steps = formData.instructions
      .split("\n")
      .map((step) => step.trim())
      .filter((step) => step);

    steps.forEach((step, index) => {
      // Use string numbers as keys like "1", "2", "3"
      instructionsObj[(index + 1).toString()] = step;
    });

    // Create the payload with the same structure as existing recipes
    const payload = {
      userID: formData.userID,
      title: formData.title,
      tags: formData.tags, // Send as plain array, not wrapped in object
      description: formData.description,
      ingredients: ingredientsObj, // Send as key-value object
      instructions: instructionsObj, // Send as numbered object
    };

    try {
      console.log("Form data userID:", formData.userID);
      console.log("Sending payload:", JSON.stringify(payload, null, 2));

      const res = await fetch("http://localhost:8080/recipe/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const text = await res.text();
        setStatus("Recipe submitted successfully.");

        // Reset form but keep the userID
        setFormData({
          userID: "nbhargav@usc.edu", // Keep the email
          title: "",
          tags: [],
          description: "",
          ingredients: [{ item: "", amount: "" }],
          instructions: "",
        });

        // Redirect after 1 second
        setTimeout(() => {
          router.push("/dashboard");
        }, 1000);
      } else {
        const errorText = await res.text();
        setStatus(`Error: ${errorText}`);
        console.error("Server response:", errorText);
      }
    } catch (error) {
      console.error("Network error:", error);
      setStatus("Network error. Please try again.");
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

      <main className="max-w-4xl mx-auto p-4 text-black">
        <div className="bg-gray-200 rounded-lg shadow p-6 space-y-6">
          <h2 className="text-xl font-semibold text-gray-800 text-center">
            Submit a Recipe
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label className="block text-sm font-medium mb-1">
                Recipe Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full rounded border border-gray-300 px-3 py-2 bg-gray-100 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={3}
                className="w-full rounded border border-gray-300 px-3 py-2 bg-gray-100 focus:bg-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Ingredients
              </label>
              <div>
                <div className="space-y-2">
                  {formData.ingredients.map((ingredient, index) => (
                    <div key={index} className="flex gap-2">
                      <input
                        type="text"
                        placeholder="Item"
                        value={ingredient.item}
                        onChange={(e) =>
                          handleIngredientChange(index, "item", e.target.value)
                        }
                        className="w-1/2 rounded border border-gray-300 px-3 py-2 bg-gray-100 focus:bg-white"
                      />
                      <input
                        type="text"
                        placeholder="Amount"
                        value={ingredient.amount}
                        onChange={(e) =>
                          handleIngredientChange(
                            index,
                            "amount",
                            e.target.value
                          )
                        }
                        className="w-1/2 rounded border border-gray-300 px-3 py-2 bg-gray-100 focus:bg-white"
                      />
                    </div>
                  ))}
                  <Button
                    type="button"
                    onClick={addIngredientRow}
                    className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400"
                  >
                    + Add Ingredient
                  </Button>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Instructions
              </label>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                required
                rows={4}
                placeholder="Enter each step on a new line"
                className="w-full rounded border border-gray-300 px-3 py-2 bg-gray-100 focus:bg-white"
              />
            </div>

            <div>
              <p className="text-sm font-medium mb-2">Dietary Tags</p>
              <div className="flex flex-wrap gap-3">
                {dietaryOptions.map((tag) => (
                  <label key={tag} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={formData.tags.includes(tag)}
                      onChange={() => handleTagToggle(tag)}
                      className="h-4 w-4"
                    />
                    <span className="text-sm">{tag}</span>
                  </label>
                ))}
              </div>
            </div>

            <Button type="submit" className="w-full bg-red-700 text-white">
              Submit Recipe
            </Button>

            {status && (
              <p className="text-sm text-center text-gray-700 mt-2">{status}</p>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}