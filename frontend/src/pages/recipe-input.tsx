// // // import { useState } from "react";
// // // import { Button } from "@/components/ui/button";
// // // import { useRouter } from "next/router";

// // // const dietaryOptions = ["Vegan", "Halal", "Gluten-Free", "Nut-Free"];

// // // export default function SubmitRecipePage() {
// // //   const [formData, setFormData] = useState({
// // //     userID: 1,
// // //     title: "",
// // //     tags: [] as string[],
// // //     description: "",
// // //     ingredients: [{ item: "", amount: "" }],
// // //     instructions: "",
// // //   });

// // //   const router = useRouter();

// // //   const [status, setStatus] = useState("");

// // //   const handleChange = (
// // //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// // //   ) => {
// // //     const { name, value } = e.target;
// // //     setFormData((prev) => ({ ...prev, [name]: value }));
// // //   };

// // //   const handleTagToggle = (tag: string) => {
// // //     setFormData((prev) => {
// // //       const tags = prev.tags.includes(tag)
// // //         ? prev.tags.filter((t) => t !== tag)
// // //         : [...prev.tags, tag];
// // //       return { ...prev, tags };
// // //     });
// // //   };

// // //   const handleIngredientChange = (
// // //     index: number,
// // //     field: "item" | "amount",
// // //     value: string
// // //   ) => {
// // //     const updated = [...formData.ingredients];
// // //     updated[index][field] = value;
// // //     setFormData((prev) => ({ ...prev, ingredients: updated }));
// // //   };

// // //   const addIngredientRow = () => {
// // //     setFormData((prev) => ({
// // //       ...prev,
// // //       ingredients: [...prev.ingredients, { item: "", amount: "" }],
// // //     }));
// // //   };

// // //   const handleSubmit = async (e: React.FormEvent) => {
// // //     e.preventDefault();

// // //     const ingredientsObject = Object.fromEntries(
// // //       formData.ingredients
// // //         .filter((i) => i.item.trim() && i.amount.trim())
// // //         .map((i) => [i.item.trim(), i.amount.trim()])
// // //     );

// // //     const payload = {
// // //       ...formData,
// // //       tags: formData.tags.join(","),
// // //       ingredients: ingredientsObject,
// // //     };

// // //     try {
// // //       const res = await fetch("http://localhost:8080/recipe/submit", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify(payload),
// // //       });

// // //       const text = await res.text();
// // //       if (res.ok) {
// // //         setStatus("Recipe submitted successfully.");

// // //         setFormData({
// // //           userID: 1,
// // //           title: "",
// // //           tags: [],
// // //           description: "",
// // //           ingredients: [{ item: "", amount: "" }],
// // //           instructions: "",
// // //         });

// // //         // 👇 Redirect after 1 second
// // //         setTimeout(() => {
// // //           router.push("/dashboard"); // change to "/recipes" or any other path if needed
// // //         }, 1000);
// // //       } else {
// // //         setStatus(`Error: ${text}`);
// // //       }
// // //     } catch {
// // //       setStatus("Network error. Please try again.");
// // //     }
// // //   };

// // //   return (
// // //     <div className="min-h-screen bg-gray-100">
// // //       <header className="bg-white shadow-sm">
// // //         <div className="max-w-4xl mx-auto px-4 py-4">
// // //           <h1 className="text-2xl text-red-700 font-bold text-center">
// // //             TROJAN BITES
// // //           </h1>
// // //         </div>
// // //       </header>

// // //       <main className="max-w-4xl mx-auto p-4 text-black">
// // //         <div className="bg-gray-200 rounded-lg shadow p-6 space-y-6">
// // //           <h2 className="text-xl font-semibold text-gray-800 text-center">
// // //             Submit a Recipe
// // //           </h2>

// // //           <form onSubmit={handleSubmit} className="space-y-4">
// // //             <div>
// // //               <label className="block text-sm font-medium mb-1">
// // //                 Recipe Title
// // //               </label>
// // //               <input
// // //                 type="text"
// // //                 name="title"
// // //                 value={formData.title}
// // //                 onChange={handleChange}
// // //                 required
// // //                 className="w-full rounded border border-gray-300 px-3 py-2 bg-gray-100 focus:bg-white"
// // //               />
// // //             </div>

// // //             <div>
// // //               <label className="block text-sm font-medium mb-1">
// // //                 Description
// // //               </label>
// // //               <textarea
// // //                 name="description"
// // //                 value={formData.description}
// // //                 onChange={handleChange}
// // //                 required
// // //                 rows={3}
// // //                 className="w-full rounded border border-gray-300 px-3 py-2 bg-gray-100 focus:bg-white"
// // //               />
// // //             </div>

// // //             <div>
// // //               <label className="block text-sm font-medium mb-1">
// // //                 Ingredients
// // //               </label>
// // //               <div>
// // //                 <div className="space-y-2">
// // //                   {formData.ingredients.map((ingredient, index) => (
// // //                     <div key={index} className="flex gap-2">
// // //                       <input
// // //                         type="text"
// // //                         placeholder="Item"
// // //                         value={ingredient.item}
// // //                         onChange={(e) =>
// // //                           handleIngredientChange(index, "item", e.target.value)
// // //                         }
// // //                         className="w-1/2 rounded border border-gray-300 px-3 py-2 bg-gray-100 focus:bg-white"
// // //                       />
// // //                       <input
// // //                         type="text"
// // //                         placeholder="Amount"
// // //                         value={ingredient.amount}
// // //                         onChange={(e) =>
// // //                           handleIngredientChange(
// // //                             index,
// // //                             "amount",
// // //                             e.target.value
// // //                           )
// // //                         }
// // //                         className="w-1/2 rounded border border-gray-300 px-3 py-2 bg-gray-100 focus:bg-white"
// // //                       />
// // //                     </div>
// // //                   ))}
// // //                   <Button
// // //                     type="button"
// // //                     onClick={addIngredientRow}
// // //                     className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400"
// // //                   >
// // //                     + Add Ingredient
// // //                   </Button>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //             <div>
// // //               <label className="block text-sm font-medium mb-1">
// // //                 Instructions
// // //               </label>
// // //               <textarea
// // //                 name="instructions"
// // //                 value={formData.instructions}
// // //                 onChange={handleChange}
// // //                 required
// // //                 rows={4}
// // //                 className="w-full rounded border border-gray-300 px-3 py-2 bg-gray-100 focus:bg-white"
// // //               />
// // //             </div>

// // //             <div>
// // //               <p className="text-sm font-medium mb-2">Dietary Tags</p>
// // //               <div className="flex flex-wrap gap-3">
// // //                 {dietaryOptions.map((tag) => (
// // //                   <label key={tag} className="flex items-center space-x-2">
// // //                     <input
// // //                       type="checkbox"
// // //                       checked={formData.tags.includes(tag)}
// // //                       onChange={() => handleTagToggle(tag)}
// // //                       className="h-4 w-4"
// // //                     />
// // //                     <span className="text-sm">{tag}</span>
// // //                   </label>
// // //                 ))}
// // //               </div>
// // //             </div>

// // //             <Button type="submit" className="w-full bg-red-700 text-white">
// // //               Submit Recipe
// // //             </Button>

// // //             {status && (
// // //               <p className="text-sm text-center text-gray-700 mt-2">{status}</p>
// // //             )}
// // //           </form>
// // //         </div>
// // //       </main>
// // //     </div>
// // //   );
// // // }

// // import { useState } from "react";
// // import { Button } from "@/components/ui/button";
// // import { useRouter } from "next/router";

// // const dietaryOptions = ["Vegan", "Halal", "Gluten-Free", "Nut-Free"];

// // export default function SubmitRecipePage() {
// //   const [formData, setFormData] = useState({
// //     userID: 1,
// //     title: "",
// //     tags: [] as string[],
// //     description: "",
// //     ingredients: [{ item: "", amount: "" }],
// //     instructions: "",
// //   });

// //   const router = useRouter();

// //   const [status, setStatus] = useState("");

// //   const handleChange = (
// //     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
// //   ) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleTagToggle = (tag: string) => {
// //     setFormData((prev) => {
// //       const tags = prev.tags.includes(tag)
// //         ? prev.tags.filter((t) => t !== tag)
// //         : [...prev.tags, tag];
// //       return { ...prev, tags };
// //     });
// //   };

// //   const handleIngredientChange = (
// //     index: number,
// //     field: "item" | "amount",
// //     value: string
// //   ) => {
// //     const updated = [...formData.ingredients];
// //     updated[index][field] = value;
// //     setFormData((prev) => ({ ...prev, ingredients: updated }));
// //   };

// //   const addIngredientRow = () => {
// //     setFormData((prev) => ({
// //       ...prev,
// //       ingredients: [...prev.ingredients, { item: "", amount: "" }],
// //     }));
// //   };

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();

// //     const ingredientsObject = Object.fromEntries(
// //       formData.ingredients
// //         .filter((i) => i.item.trim() && i.amount.trim())
// //         .map((i) => [i.item.trim(), i.amount.trim()])
// //     );

// //     // Create a proper JSON object for tags instead of a comma-separated string
// //     const tagsObject: Record<string, string> = {};
// //     formData.tags.forEach((tag, index) => {
// //       tagsObject[index.toString()] = tag;
// //     });

// //     const payload = {
// //       userID: formData.userID,
// //       title: formData.title,
// //       tags: tagsObject, // Send tags as a JSON object
// //       description: formData.description,
// //       ingredients: ingredientsObject,
// //       instructions: formData.instructions,
// //     };

// //     try {
// //       console.log("Sending payload:", JSON.stringify(payload)); // For debugging

// //       const res = await fetch("http://localhost:8080/recipe/submit", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(payload),
// //       });

// //       const text = await res.text();
// //       if (res.ok) {
// //         setStatus("Recipe submitted successfully.");

// //         setFormData({
// //           userID: 1,
// //           title: "",
// //           tags: [],
// //           description: "",
// //           ingredients: [{ item: "", amount: "" }],
// //           instructions: "",
// //         });

// //         // Redirect after 1 second
// //         setTimeout(() => {
// //           router.push("/dashboard");
// //         }, 1000);
// //       } else {
// //         setStatus(`Error: ${text}`);
// //         console.error("Server response:", text); // For debugging
// //       }
// //     } catch (error) {
// //       console.error("Network error:", error); // For debugging
// //       setStatus("Network error. Please try again.");
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-gray-100">
// //       <header className="bg-white shadow-sm">
// //         <div className="max-w-4xl mx-auto px-4 py-4">
// //           <h1 className="text-2xl text-red-700 font-bold text-center">
// //             TROJAN BITES
// //           </h1>
// //         </div>
// //       </header>

// //       <main className="max-w-4xl mx-auto p-4 text-black">
// //         <div className="bg-gray-200 rounded-lg shadow p-6 space-y-6">
// //           <h2 className="text-xl font-semibold text-gray-800 text-center">
// //             Submit a Recipe
// //           </h2>

// //           <form onSubmit={handleSubmit} className="space-y-4">
// //             <div>
// //               <label className="block text-sm font-medium mb-1">
// //                 Recipe Title
// //               </label>
// //               <input
// //                 type="text"
// //                 name="title"
// //                 value={formData.title}
// //                 onChange={handleChange}
// //                 required
// //                 className="w-full rounded border border-gray-300 px-3 py-2 bg-gray-100 focus:bg-white"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium mb-1">
// //                 Description
// //               </label>
// //               <textarea
// //                 name="description"
// //                 value={formData.description}
// //                 onChange={handleChange}
// //                 required
// //                 rows={3}
// //                 className="w-full rounded border border-gray-300 px-3 py-2 bg-gray-100 focus:bg-white"
// //               />
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium mb-1">
// //                 Ingredients
// //               </label>
// //               <div>
// //                 <div className="space-y-2">
// //                   {formData.ingredients.map((ingredient, index) => (
// //                     <div key={index} className="flex gap-2">
// //                       <input
// //                         type="text"
// //                         placeholder="Item"
// //                         value={ingredient.item}
// //                         onChange={(e) =>
// //                           handleIngredientChange(index, "item", e.target.value)
// //                         }
// //                         className="w-1/2 rounded border border-gray-300 px-3 py-2 bg-gray-100 focus:bg-white"
// //                       />
// //                       <input
// //                         type="text"
// //                         placeholder="Amount"
// //                         value={ingredient.amount}
// //                         onChange={(e) =>
// //                           handleIngredientChange(
// //                             index,
// //                             "amount",
// //                             e.target.value
// //                           )
// //                         }
// //                         className="w-1/2 rounded border border-gray-300 px-3 py-2 bg-gray-100 focus:bg-white"
// //                       />
// //                     </div>
// //                   ))}
// //                   <Button
// //                     type="button"
// //                     onClick={addIngredientRow}
// //                     className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400"
// //                   >
// //                     + Add Ingredient
// //                   </Button>
// //                 </div>
// //               </div>
// //             </div>

// //             <div>
// //               <label className="block text-sm font-medium mb-1">
// //                 Instructions
// //               </label>
// //               <textarea
// //                 name="instructions"
// //                 value={formData.instructions}
// //                 onChange={handleChange}
// //                 required
// //                 rows={4}
// //                 className="w-full rounded border border-gray-300 px-3 py-2 bg-gray-100 focus:bg-white"
// //               />
// //             </div>

// //             <div>
// //               <p className="text-sm font-medium mb-2">Dietary Tags</p>
// //               <div className="flex flex-wrap gap-3">
// //                 {dietaryOptions.map((tag) => (
// //                   <label key={tag} className="flex items-center space-x-2">
// //                     <input
// //                       type="checkbox"
// //                       checked={formData.tags.includes(tag)}
// //                       onChange={() => handleTagToggle(tag)}
// //                       className="h-4 w-4"
// //                     />
// //                     <span className="text-sm">{tag}</span>
// //                   </label>
// //                 ))}
// //               </div>
// //             </div>

// //             <Button type="submit" className="w-full bg-red-700 text-white">
// //               Submit Recipe
// //             </Button>

// //             {status && (
// //               <p className="text-sm text-center text-gray-700 mt-2">{status}</p>
// //             )}
// //           </form>
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }


// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { useRouter } from "next/router";

// const dietaryOptions = ["Vegan", "Halal", "Gluten-Free", "Nut-Free"];

// export default function SubmitRecipePage() {
//   const [formData, setFormData] = useState({
//     userID: 1,
//     title: "",
//     tags: [] as string[],
//     description: "",
//     ingredients: [{ item: "", amount: "" }],
//     instructions: "",
//   });

//   const router = useRouter();

//   const [status, setStatus] = useState("");

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleTagToggle = (tag: string) => {
//     setFormData((prev) => {
//       const tags = prev.tags.includes(tag)
//         ? prev.tags.filter((t) => t !== tag)
//         : [...prev.tags, tag];
//       return { ...prev, tags };
//     });
//   };

//   const handleIngredientChange = (
//     index: number,
//     field: "item" | "amount",
//     value: string
//   ) => {
//     const updated = [...formData.ingredients];
//     updated[index][field] = value;
//     setFormData((prev) => ({ ...prev, ingredients: updated }));
//   };

//   const addIngredientRow = () => {
//     setFormData((prev) => ({
//       ...prev,
//       ingredients: [...prev.ingredients, { item: "", amount: "" }],
//     }));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const ingredientsList = Object.fromEntries(
//       formData.ingredients
//         .filter((i) => i.item.trim() && i.amount.trim())
//         .map((i) => [i.item.trim(), i.amount.trim()])
//     );

//     const stepList = formData.instructions
//     .split("\n")
//     .map((step) => step.trim())
//     .filter((step) => step)
//     // According to the error, the server expects a JSONObject
//     // We should wrap the instructions in JSON format too
//     const instructionsObj = {
//       text: formData.instructions,
//     };

//     // Convert tags to a simple string array as expected by backend
//     const payload = {
//       userID: formData.userID,
//       title: formData.title,
//       tags: formData.tags, // Send as array, not object
//       description: formData.description,
//       ingredients: ingredientsList,
//       instructions: stepList, // Send as object
//     };

//     try {
//       console.log("Sending payload:", JSON.stringify(payload)); // For debugging

//       const res = await fetch("http://localhost:8080/recipe/submit", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });

//       if (res.ok) {
//         const text = await res.text();
//         setStatus("Recipe submitted successfully.");

//         setFormData({
//           userID: 1,
//           title: "",
//           tags: [],
//           description: "",
//           ingredients: [{ item: "", amount: "" }],
//           instructions: "",
//         });

//         // Redirect after 1 second
//         setTimeout(() => {
//           router.push("/dashboard");
//         }, 1000);
//       } else {
//         const errorText = await res.text();
//         setStatus(`Error: ${errorText}`);
//         console.error("Server response:", errorText); // For debugging
//       }
//     } catch (error) {
//       console.error("Network error:", error); // For debugging
//       setStatus("Network error. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100">
//       <header className="bg-white shadow-sm">
//         <div className="max-w-4xl mx-auto px-4 py-4">
//           <h1 className="text-2xl text-red-700 font-bold text-center">
//             TROJAN BITES
//           </h1>
//         </div>
//       </header>

//       <main className="max-w-4xl mx-auto p-4 text-black">
//         <div className="bg-gray-200 rounded-lg shadow p-6 space-y-6">
//           <h2 className="text-xl font-semibold text-gray-800 text-center">
//             Submit a Recipe
//           </h2>

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Recipe Title
//               </label>
//               <input
//                 type="text"
//                 name="title"
//                 value={formData.title}
//                 onChange={handleChange}
//                 required
//                 className="w-full rounded border border-gray-300 px-3 py-2 bg-gray-100 focus:bg-white"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Description
//               </label>
//               <textarea
//                 name="description"
//                 value={formData.description}
//                 onChange={handleChange}
//                 required
//                 rows={3}
//                 className="w-full rounded border border-gray-300 px-3 py-2 bg-gray-100 focus:bg-white"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Ingredients
//               </label>
//               <div>
//                 <div className="space-y-2">
//                   {formData.ingredients.map((ingredient, index) => (
//                     <div key={index} className="flex gap-2">
//                       <input
//                         type="text"
//                         placeholder="Item"
//                         value={ingredient.item}
//                         onChange={(e) =>
//                           handleIngredientChange(index, "item", e.target.value)
//                         }
//                         className="w-1/2 rounded border border-gray-300 px-3 py-2 bg-gray-100 focus:bg-white"
//                       />
//                       <input
//                         type="text"
//                         placeholder="Amount"
//                         value={ingredient.amount}
//                         onChange={(e) =>
//                           handleIngredientChange(
//                             index,
//                             "amount",
//                             e.target.value
//                           )
//                         }
//                         className="w-1/2 rounded border border-gray-300 px-3 py-2 bg-gray-100 focus:bg-white"
//                       />
//                     </div>
//                   ))}
//                   <Button
//                     type="button"
//                     onClick={addIngredientRow}
//                     className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400"
//                   >
//                     + Add Ingredient
//                   </Button>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium mb-1">
//                 Instructions
//               </label>
//               <textarea
//                 name="instructions"
//                 value={formData.instructions}
//                 onChange={handleChange}
//                 required
//                 rows={4}
//                 className="w-full rounded border border-gray-300 px-3 py-2 bg-gray-100 focus:bg-white"
//               />
//             </div>

//             <div>
//               <p className="text-sm font-medium mb-2">Dietary Tags</p>
//               <div className="flex flex-wrap gap-3">
//                 {dietaryOptions.map((tag) => (
//                   <label key={tag} className="flex items-center space-x-2">
//                     <input
//                       type="checkbox"
//                       checked={formData.tags.includes(tag)}
//                       onChange={() => handleTagToggle(tag)}
//                       className="h-4 w-4"
//                     />
//                     <span className="text-sm">{tag}</span>
//                   </label>
//                 ))}
//               </div>
//             </div>

//             <Button type="submit" className="w-full bg-red-700 text-white">
//               Submit Recipe
//             </Button>

//             {status && (
//               <p className="text-sm text-center text-gray-700 mt-2">{status}</p>
//             )}
//           </form>
//         </div>
//       </main>
//     </div>
//   );
// }

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const dietaryOptions = ["Vegan", "Halal", "Gluten-Free", "Nut-Free"];

export default function SubmitRecipePage() {
  const [formData, setFormData] = useState({
    userID: 1,
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

    // Create ingredients JSONObject structure
    const ingredientsObj = {
      ingredients: formData.ingredients
        .filter((i) => i.item.trim() && i.amount.trim())
        .map((i) => `${i.item.trim()} - ${i.amount.trim()}`),
    };

    // Create steps JSONObject structure
    const stepsObj = {
      steps: formData.instructions
        .split("\n")
        .map((step) => step.trim())
        .filter((step) => step),
    };

    // Create tags JSONObject structure
    const tagsObj = {
      tags: formData.tags,
    };

    // Create the payload with proper JSONObject structures
    const payload = {
      userID: formData.userID,
      title: formData.title,
      tags: tagsObj,
      description: formData.description,
      ingredients: ingredientsObj,
      instructions: stepsObj,
    };

    try {
      console.log("Sending payload:", JSON.stringify(payload)); // For debugging

      const res = await fetch("http://localhost:8080/recipe/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const text = await res.text();
        setStatus("Recipe submitted successfully.");

        setFormData({
          userID: 1,
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
        console.error("Server response:", errorText); // For debugging
      }
    } catch (error) {
      console.error("Network error:", error); // For debugging
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