package com.team10.demo.controller;

import org.json.JSONObject;

public class Recipe {
    private int userID;
    private String Title;
    private String tags;
    private String description;
    private JSONObject ingredients;
    private String instructions;
    public boolean isValid(){
        if (userID == 0) return false;
        if (Title == null || Title.isEmpty()) return false;
        if (tags == null || tags.isEmpty()) return false;
        if (description == null || description.isEmpty()) return false;
        if (ingredients == null) return false;
        if (instructions == null || instructions.isEmpty()) return false;
        return true;
    }
    public int getUserID() {
        return userID;
    }
    public void setUserID(int userID) {
        this.userID = userID;
    }
    public String getTitle() {
        return Title;
    }
    public void setTitle(String title) {
        Title = title;
    }
    public String getTags() {
        return tags;
    }
    public void setTags(String tags) {
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
    public String getInstructions() {
        return instructions;
    }
    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }
}
