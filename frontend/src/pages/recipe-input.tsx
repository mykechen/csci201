import React, { useState } from "react";

const dietaryOptions = ["Vegan", "Halal", "Gluten-Free", "Nut-Free"];

export default function SubmitRecipePage() {
  const [formData, setFormData] = useState({
    userID: 1, // Replace with real user ID from auth context/session
    title: "",
    tags: [] as string[],
    description: "",
    ingredients: "",
    instructions: "",
  });

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...formData,
      tags: formData.tags.join(","),
    };

    try {
      const res = await fetch("http://localhost:8080/recipe/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const text = await res.text();
      if (res.ok) {
        setStatus("Recipe submitted successfully.");
        setFormData({
          userID: 1,
          title: "",
          tags: [],
          description: "",
          ingredients: "",
          instructions: "",
        });
      } else {
        setStatus(`Error: ${text}`);
      }
    } catch (err) {
      setStatus("Network error. Please try again.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-6 py-10">
      <h2 className="text-3xl font-bold mb-6 text-center">Submit a Recipe</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Recipe Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows={3}
            className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Ingredients</label>
          <textarea
            name="ingredients"
            value={formData.ingredients}
            onChange={handleChange}
            required
            rows={3}
            placeholder='e.g. {"rice": "2 cups", "chicken": "1 lb"}'
            className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Instructions</label>
          <textarea
            name="instructions"
            value={formData.instructions}
            onChange={handleChange}
            required
            rows={4}
            className="w-full rounded border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
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

        <button
          type="submit"
          className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800 transition"
        >
          Submit Recipe
        </button>

        {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}
      </form>
    </div>
  );
}
