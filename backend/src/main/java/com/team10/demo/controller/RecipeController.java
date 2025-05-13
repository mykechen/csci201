package com.team10.demo.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/recipe")
@CrossOrigin(origins = "*")
public class RecipeController {
    private static final String SQLurl = ""; // Change
    private static final String SQLuser = ""; // Change
    private static final String SQLpassword = ""; // Make sure this matches your actual MySQL password
    private static final String SQLDriver = "com.mysql.cj.jdbc.Driver";

    // Initialize the driver once at class level
    static {
        try {
            Class.forName(SQLDriver);
            System.out.println("JDBC Driver loaded successfully");
        } catch (ClassNotFoundException e) {
            System.err.println("Failed to load JDBC driver: " + e.getMessage());
            e.printStackTrace();
        }
    }

    // Add a simple test endpoint to verify basic connectivity
    @GetMapping("/test")
    public ResponseEntity<String> testEndpoint() {
        return ResponseEntity.ok("API is working");
    }

    // Add a DB test endpoint to verify database connectivity
    @GetMapping("/dbtest")
    public ResponseEntity<String> testDatabaseConnection() {
        try (Connection conn = DriverManager.getConnection(SQLurl, SQLuser, SQLpassword)) {
            return ResponseEntity.ok("Database connection successful");
        } catch (SQLException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Database connection failed: " + e.getMessage());
        }
    }

    public RecipeController() {
        try {
            Class.forName(SQLDriver);
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }
    
    // Update submit method to accept Map and handle conversion properly
    @PostMapping("/submit")
    public ResponseEntity<String> recipe(@RequestBody Map<String, Object> requestBody) {
        System.out.println("Raw request body: " + requestBody);
        
        try {
            // Extract userID directly from the map
            String userID = (String) requestBody.get("userID");
            System.out.println("Extracted userID: " + userID);
            
            // Create Recipe object manually from the map
            Recipe recipe = new Recipe();
            recipe.setUserID(userID);
            recipe.setTitle((String) requestBody.get("title"));
            recipe.setDescription((String) requestBody.get("description"));
            
            // Handle tags - convert List to JSONObject with "tags" key (if needed for compatibility)
            if (requestBody.get("tags") instanceof List) {
                List<String> tagsList = (List<String>) requestBody.get("tags");
                JSONObject tagsObj = new JSONObject();
                tagsObj.put("tags", tagsList);
                recipe.setTags(tagsObj);
            }
            
            // Handle ingredients - convert Map to JSONObject
            if (requestBody.get("ingredients") instanceof Map) {
                Map<String, Object> ingredientsMap = (Map<String, Object>) requestBody.get("ingredients");
                JSONObject ingredientsObj = new JSONObject(ingredientsMap);
                recipe.setIngredients(ingredientsObj);
            }
            
            // Handle instructions - convert Map to JSONObject
            if (requestBody.get("instructions") instanceof Map) {
                Map<String, Object> instructionsMap = (Map<String, Object>) requestBody.get("instructions");
                JSONObject instructionsObj = new JSONObject(instructionsMap);
                recipe.setInstructions(instructionsObj);
            }
            
            System.out.println("Created recipe - userID: " + recipe.getUserID());
            System.out.println("Created recipe - title: " + recipe.getTitle());
            System.out.println("Created recipe - tags: " + recipe.getTags());
            System.out.println("Created recipe - ingredients: " + recipe.getIngredients());
            System.out.println("Created recipe - instructions: " + recipe.getInstructions());
            
            // Check validation
            if (!recipe.isValid()) {
                System.out.println("Recipe validation failed!");
                System.out.println("userID null/empty: " + (recipe.getUserID() == null || recipe.getUserID().isEmpty()));
                System.out.println("title null/empty: " + (recipe.getTitle() == null || recipe.getTitle().isEmpty()));
                System.out.println("tags null: " + (recipe.getTags() == null));
                System.out.println("description null: " + (recipe.getDescription() == null));
                System.out.println("ingredients null: " + (recipe.getIngredients() == null));
                System.out.println("instructions null: " + (recipe.getInstructions() == null));
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid recipe data.");
            }

            try (Connection conn = DriverManager.getConnection(SQLurl, SQLuser, SQLpassword);
                 PreparedStatement ps = conn.prepareStatement(
                    "INSERT INTO Recipe (user_id, title, tags, description, ingredients, instructions) VALUES (?, ?, ?, ?, ?, ?)")) {
                
                ps.setString(1, recipe.getUserID());
                ps.setString(2, recipe.getTitle());
                ps.setString(3, recipe.getTags().toString());
                ps.setString(4, recipe.getDescription());
                ps.setString(5, recipe.getIngredients().toString());
                ps.setString(6, recipe.getInstructions().toString());
                
                int rows = ps.executeUpdate();
                if (rows > 0) {
                    return ResponseEntity.status(HttpStatus.CREATED).body("Recipe submitted successfully.");
                } else {
                    return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to submit recipe.");
                }
            } catch (SQLException sqle) {
                sqle.printStackTrace(); // Log the error for debugging
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error: " + sqle.getMessage());
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error processing request: " + e.getMessage());
        }
    }

    // Keep the rest of your methods unchanged
    @GetMapping("/all")
    public ResponseEntity<?> getAllRecipes() {
        System.out.println("Fetching all recipes - starting debug version");
        
        try {
            // First just test connection
            try (Connection conn = DriverManager.getConnection(SQLurl, SQLuser, SQLpassword)) {
                System.out.println("Database connection established");
                
                // Try simple query to verify table exists
                try (PreparedStatement checkTable = conn.prepareStatement("SHOW TABLES LIKE 'Recipe'");
                     ResultSet tableResult = checkTable.executeQuery()) {
                    
                    if (!tableResult.next()) {
                        System.out.println("Recipe table does not exist!");
                        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                            .body("Recipe table does not exist in database");
                    }
                    
                    System.out.println("Recipe table exists, now querying data");
                }
                
                // Now fetch recipes with simplified logic
                List<Object> simplifiedResult = new ArrayList<>();
                
                try (PreparedStatement ps = conn.prepareStatement("SELECT recipe_id, user_id, title, description, ingredients, instructions, tags, votes FROM Recipe");
                     ResultSet rs = ps.executeQuery()) {
                    
                    System.out.println("Query executed successfully");
                    
                    while (rs.next()) {
                        System.out.println("Found recipe: " + rs.getString("title"));
                        // Just create a simplified object with id and title for debugging
                        JSONObject recipe = new JSONObject();
                        recipe.put("userId", rs.getString("user_id")); // Changed to getString for email
                        recipe.put("title", rs.getString("title"));
                        recipe.put("description", rs.getString("description"));
                        recipe.put("ingredients", rs.getObject("ingredients").toString());
                        recipe.put("steps", rs.getObject("instructions").toString());
                        recipe.put("tags", rs.getObject("tags").toString());
                        recipe.put("votes", rs.getInt("votes"));
                        simplifiedResult.add(recipe.toMap());
                    }
                    
                    System.out.println("Found " + simplifiedResult.size() + " recipes");
                    return ResponseEntity.ok(simplifiedResult);
                }
            }
        } catch (SQLException sqle) {
            System.err.println("SQL Error: " + sqle.getMessage());
            sqle.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Database error: " + sqle.getMessage());
        } catch (Exception e) {
            System.err.println("Unexpected error: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Server error: " + e.getMessage());
        }
    }

    @PostMapping("/getRecipe")
    public ResponseEntity<?> getRecipe(@RequestBody String title) {
        System.out.println("Fetching recipe with title: " + title);
        
        try (Connection conn = DriverManager.getConnection(SQLurl, SQLuser, SQLpassword);
             PreparedStatement ps = conn.prepareStatement("SELECT * FROM Recipe WHERE title = ?")) {
            
            ps.setString(1, title);
            
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) {
                    Recipe recipe = new Recipe();
                    // recipe.setId(rs.getInt("recipe_id"));
                    // Changed from getInt to getString for user_id
                    recipe.setUserID(rs.getString("user_id"));
                    recipe.setTitle(rs.getString("title"));
                    
                    // Safely parse JSON strings
                    String tagsStr = rs.getString("tags");
                    if (tagsStr != null && !tagsStr.isEmpty()) {
                        recipe.setTags(new JSONObject(tagsStr));
                    }
                    
                    recipe.setDescription(rs.getString("description"));
                    
                    String ingredientsStr = rs.getString("ingredients");
                    if (ingredientsStr != null && !ingredientsStr.isEmpty()) {
                        recipe.setIngredients(new JSONObject(ingredientsStr));
                    }
                    
                    String instructionsStr = rs.getString("instructions");
                    if (instructionsStr != null && !instructionsStr.isEmpty()) {
                        recipe.setInstructions(new JSONObject(instructionsStr));
                    }
                    
                    // Convert to response format
                    return ResponseEntity.ok(recipe.toResponse());
                } else {
                    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Recipe not found.");
                }
            }
        } catch (SQLException sqle) {
            sqle.printStackTrace(); // Log the error for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Database error: " + sqle.getMessage());
        }
    }

    @PostMapping("/deleteRecipe")
    public ResponseEntity<String> deleteRecipe(@RequestBody String title) {
        System.out.println("Deleting recipe with title: " + title);
        
        try (Connection conn = DriverManager.getConnection(SQLurl, SQLuser, SQLpassword);
             PreparedStatement ps = conn.prepareStatement("DELETE FROM Recipe WHERE title = ?")) {
            
            ps.setString(1, title);
            int rows = ps.executeUpdate();
            
            if (rows > 0) {
                return ResponseEntity.ok("Recipe deleted successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Recipe not found.");
            }
        } catch (SQLException sqle) {
            sqle.printStackTrace(); // Log the error for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Database error: " + sqle.getMessage());
        }
    }
}