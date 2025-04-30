package com.team10.demo.controller;

import org.json.JSONObject;

public class Recipe {
    private int userID;
    private String Title;
    private String tags;
    private String description;
    private JSONObject ingredients;
    private String instructions;
    public int getUserID() {
        return userID;
    }
    public String getTitle() {
        return Title;
    }
    public String getTags() {
        return tags;
    }
    public String getDescription() {
        return description;
    }
    public JSONObject getIngredients() {
        return ingredients;
    }
    public String getInstructions() {
        return instructions;
    }
}
