// // package com.team10.demo.controller;

// // import org.json.JSONObject;

// // public class Recipe {
// //     private int userID;
// //     private String Title;
// //     private JSONObject tags;
// //     private String description;
// //     private JSONObject ingredients;
// //     private JSONObject instructions;
// //     public boolean isValid(){
// //         if (userID == 0) return false;
// //         if (Title == null || Title.isEmpty()) return false;
// //         if (tags == null || tags.isEmpty()) return false;
// //         if (description == null || description.isEmpty()) return false;
// //         if (ingredients == null) return false;
// //         if (instructions == null || instructions.isEmpty()) return false;
// //         return true;
// //     }
// //     public int getUserID() {
// //         return userID;
// //     }
// //     public void setUserID(int userID) {
// //         this.userID = userID;
// //     }
// //     public String getTitle() {
// //         return Title;
// //     }
// //     public void setTitle(String title) {
// //         Title = title;
// //     }
// //     public JSONObject getTags() {
// //         return tags;
// //     }
// //     public void setTags(JSONObject tags) {
// //         this.tags = tags;
// //     }
// //     public String getDescription() {
// //         return description;
// //     }
// //     public void setDescription(String description) {
// //         this.description = description;
// //     }
// //     public JSONObject getIngredients() {
// //         return ingredients;
// //     }
// //     public void setIngredients(JSONObject ingredients) {
// //         this.ingredients = ingredients;
// //     }
// //     public JSONObject getInstructions() {
// //         return instructions;
// //     }
// //     public void setInstructions(JSONObject instructions) {
// //         this.instructions = instructions;
// //     }
// // }


// package com.team10.demo.controller;

// import java.util.ArrayList;
// import java.util.List;

// import org.json.JSONArray;
// import org.json.JSONObject;

// public class Recipe {
//     private int id; // Added ID field
//     private int userID;
//     private String Title;
//     private JSONObject tags;
//     private String description;
//     private JSONObject ingredients;
//     private JSONObject instructions;
//     private int votes = 0; // Added votes field with default value
    
//     public boolean isValid(){
//         if (userID == 0) return false;
//         if (Title == null || Title.isEmpty()) return false;
//         if (tags == null || tags.isEmpty()) return false;
//         if (description == null || description.isEmpty()) return false;
//         if (ingredients == null) return false;
//         if (instructions == null || instructions.isEmpty()) return false;
//         return true;
//     }
    
//     public int getId() {
//         return id;
//     }
    
//     public void setId(int id) {
//         this.id = id;
//     }
    
//     public int getUserID() {
//         return userID;
//     }
    
//     public void setUserID(int userID) {
//         this.userID = userID;
//     }
    
//     public String getTitle() {
//         return Title;
//     }
    
//     public void setTitle(String title) {
//         Title = title;
//     }
    
//     public JSONObject getTags() {
//         return tags;
//     }
    
//     public void setTags(JSONObject tags) {
//         this.tags = tags;
//     }
    
//     public String getDescription() {
//         return description;
//     }
    
//     public void setDescription(String description) {
//         this.description = description;
//     }
    
//     public JSONObject getIngredients() {
//         return ingredients;
//     }
    
//     public void setIngredients(JSONObject ingredients) {
//         this.ingredients = ingredients;
//     }
    
//     public JSONObject getInstructions() {
//         return instructions;
//     }
    
//     public void setInstructions(JSONObject instructions) {
//         this.instructions = instructions;
//     }
    
//     public int getVotes() {
//         return votes;
//     }
    
//     public void setVotes(int votes) {
//         this.votes = votes;
//     }
    
//     // Helper methods to convert JSONObjects to Lists for the frontend
//     public List<String> getTagsList() {
//         List<String> tagsList = new ArrayList<>();
//         if (tags != null) {
//             JSONArray tagsArray = tags.optJSONArray("tags");
//             if (tagsArray != null) {
//                 for (int i = 0; i < tagsArray.length(); i++) {
//                     tagsList.add(tagsArray.getString(i));
//                 }
//             }
//         }
//         return tagsList;
//     }
    
//     public List<String> getIngredientsList() {
//         List<String> ingredientsList = new ArrayList<>();
//         if (ingredients != null) {
//             JSONArray ingredientsArray = ingredients.optJSONArray("ingredients");
//             if (ingredientsArray != null) {
//                 for (int i = 0; i < ingredientsArray.length(); i++) {
//                     ingredientsList.add(ingredientsArray.getString(i));
//                 }
//             }
//         }
//         return ingredientsList;
//     }
    
//     public List<String> getStepsList() {
//         List<String> stepsList = new ArrayList<>();
//         if (instructions != null) {
//             JSONArray stepsArray = instructions.optJSONArray("steps");
//             if (stepsArray != null) {
//                 for (int i = 0; i < stepsArray.length(); i++) {
//                     stepsList.add(stepsArray.getString(i));
//                 }
//             }
//         }
//         return stepsList;
//     }
    
//     // Method to convert the Recipe object to a format suitable for frontend JSON response
//     public RecipeResponse toResponse() {
//         RecipeResponse response = new RecipeResponse();
//         response.setId(this.id);
//         response.setUserId(this.userID);
//         response.setTitle(this.Title);
//         response.setDescription(this.description);
//         response.setTags(this.getTagsList());
//         response.setIngredients(this.getIngredientsList());
//         response.setSteps(this.getStepsList());
//         response.setVotes(this.votes);
//         return response;
//     }
    
//     // Inner class for frontend response format
//     public static class RecipeResponse {
//         private int id;
//         private int userId;
//         private String title;
//         private String description;
//         private List<String> tags;
//         private List<String> ingredients;
//         private List<String> steps;
//         private int votes;
        
//         public int getId() {
//             return id;
//         }
        
//         public void setId(int id) {
//             this.id = id;
//         }
        
//         public int getUserId() {
//             return userId;
//         }
        
//         public void setUserId(int userId) {
//             this.userId = userId;
//         }
        
//         public String getTitle() {
//             return title;
//         }
        
//         public void setTitle(String title) {
//             this.title = title;
//         }
        
//         public String getDescription() {
//             return description;
//         }
        
//         public void setDescription(String description) {
//             this.description = description;
//         }
        
//         public List<String> getTags() {
//             return tags;
//         }
        
//         public void setTags(List<String> tags) {
//             this.tags = tags;
//         }
        
//         public List<String> getIngredients() {
//             return ingredients;
//         }
        
//         public void setIngredients(List<String> ingredients) {
//             this.ingredients = ingredients;
//         }
        
//         public List<String> getSteps() {
//             return steps;
//         }
        
//         public void setSteps(List<String> steps) {
//             this.steps = steps;
//         }
        
//         public int getVotes() {
//             return votes;
//         }
        
//         public void setVotes(int votes) {
//             this.votes = votes;
//         }
//     }
// }

package com.team10.demo.controller;

import org.json.JSONObject;

public class Recipe {
    private int id;
    private int userID;
    private String title;
    private JSONObject tags;
    private int votes;
    private String description;
    private JSONObject ingredients;
    private JSONObject instructions;
  

    // Constructors
    public Recipe() {
    }

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }
    

    public int getUserID() {
        return userID;
    }

    public void setUserID(int userID) {
        this.userID = userID;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public JSONObject getTags() {
        return tags;
    }

    public void setTags(JSONObject tags) {
        this.tags = tags;
    }
    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public JSONObject getIngredients() {
        return ingredients;
    }

    public void setIngredients(JSONObject ingredients) {
        this.ingredients = ingredients;
    }

    public JSONObject getInstructions() {
        return instructions;
    }

    public void setInstructions(JSONObject instructions) {
        this.instructions = instructions;
    }
    
    public int getVotes() {
        return votes;
    }
    
    public void setVotes(int votes) {
        this.votes = votes;
    }

    // Validation method
    public boolean isValid() {
        return userID > 0 && title != null && !title.isEmpty() && 
               tags != null && description != null && 
               ingredients != null && instructions != null;
    }

    @Override
    public String toString() {
        JSONObject jsonObject = new JSONObject();
        jsonObject.put("id", id);
        jsonObject.put("userId", userID);
        jsonObject.put("title", title);
        jsonObject.put("tags", tags);
        jsonObject.put("description", description);
        jsonObject.put("ingredients", ingredients);
        jsonObject.put("instructions", instructions);
        jsonObject.put("votes", votes);
        return jsonObject.toString();
    }

    // Response class for frontend
    public RecipeResponse toResponse() {
        RecipeResponse response = new RecipeResponse();
        response.id = this.id;
        response.userId = this.userID;
        response.title = this.title;
        
        // Extract tags array from JSONObject
        if (this.tags != null && this.tags.has("tags")) {
            response.tags = new String[this.tags.getJSONArray("tags").length()];
            for (int i = 0; i < this.tags.getJSONArray("tags").length(); i++) {
                response.tags[i] = this.tags.getJSONArray("tags").getString(i);
            }
        }
        
        response.description = this.description;
        
        // Extract ingredients array from JSONObject
        if (this.ingredients != null && this.ingredients.has("ingredients")) {
            response.ingredients = new String[this.ingredients.getJSONArray("ingredients").length()];
            for (int i = 0; i < this.ingredients.getJSONArray("ingredients").length(); i++) {
                response.ingredients[i] = this.ingredients.getJSONArray("ingredients").getString(i);
            }
        }
        
        // Extract steps array from JSONObject
        if (this.instructions != null && this.instructions.has("steps")) {
            response.steps = new String[this.instructions.getJSONArray("steps").length()];
            for (int i = 0; i < this.instructions.getJSONArray("steps").length(); i++) {
                response.steps[i] = this.instructions.getJSONArray("steps").getString(i);
            }
        }
        
        response.votes = this.votes;
        return response;
    }

    public static class RecipeResponse {
        public int id;
        public int userId;
        public String title;
        public String[] tags;
        public String description;
        public String[] ingredients;
        public String[] steps;
        public int votes;
    }
}