package com.team10.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import org.json.JSONObject;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/recipe")
public class RecipeController {
    private static final String SQLurl = ""; // Change
    private static final String SQLuser = ""; // Change
    private static final String SQLpassword = ""; // Change
    private static final String SQLDriver = "com.mysql.cj.jdbc.Driver"; // Change if needed
    private static final String domain = "@usc.edu";

    @PostMapping("/submit")
    public ResponseEntity<String> recipe(@RequestBody Recipe request) {

        PreparedStatement ps = null;
        if (!request.isValid()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid recipe data.");
        }
        int user_id = request.getUserID();
        String title = request.getTitle();
        String tags = request.getTags();
        String description = request.getDescription();
        String ingredients = request.getIngredients().toString();
        // Convert JSONObject to String for SQL insertion
        String instructions = request.getInstructions();

        try (Connection conn = DriverManager.getConnection(SQLurl, SQLuser, SQLpassword)) {
            // Check if user already exists
            ps = conn.prepareStatement("INSERT INTO Recipe (user_id, title, tags, description, ingredients, instructions) VALUES (?, ?, ?, ?, ?, ?)");
            ps.setInt(1, user_id);
            ps.setString(2, title);
            ps.setString(3, tags);
            ps.setString(4, description);
            ps.setString(5, ingredients);
            ps.setString(6, instructions);
            int rows = ps.executeUpdate();
            if (rows > 0) {
                return ResponseEntity.status(HttpStatus.CREATED).body("Recipe submitted successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to submit recipe.");
            }

        } catch (SQLException sqle) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error: " + sqle.getMessage());
        }

    }
    
    @PostMapping("/getRecipe")
    public ResponseEntity<String> getRecipe(@RequestBody String title) {
        PreparedStatement ps = null;
        ResultSet rs = null;

        try (Connection conn = DriverManager.getConnection(SQLurl, SQLuser, SQLpassword)) {
            ps = conn.prepareStatement("SELECT * FROM Recipe WHERE title = ?");
            ps.setString(1, title);
            rs = ps.executeQuery();

            if (rs.next()) {
                Recipe recipe = new Recipe();
                recipe.setUserID(rs.getInt("user_id"));
                recipe.setTitle(rs.getString("title"));
                recipe.setTags(rs.getString("tags"));
                recipe.setDescription(rs.getString("description"));
                recipe.setIngredients(new JSONObject(rs.getString("ingredients")));
                recipe.setInstructions(rs.getString("instructions"));

                return ResponseEntity.ok(recipe.toString());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Recipe not found.");
            }

        } catch (SQLException sqle) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error: " + sqle.getMessage());
        }
    }
    // might need to change bc this would let anyone delete any recipe
    @PostMapping("/deleteRecipe")
    public ResponseEntity<String> deleteRecipe(@RequestBody String title) {
        PreparedStatement ps = null;
        ResultSet rs = null;

        try (Connection conn = DriverManager.getConnection(SQLurl, SQLuser, SQLpassword)) {
            ps = conn.prepareStatement("DELETE FROM Recipe WHERE title = ?");
            ps.setString(1, title);
            int rows = ps.executeUpdate();
            if (rows > 0) {
                return ResponseEntity.ok("Recipe deleted successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Recipe not found.");
            }

        } catch (SQLException sqle) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error: " + sqle.getMessage());
        }
    }
}
