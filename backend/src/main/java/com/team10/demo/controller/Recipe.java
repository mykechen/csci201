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