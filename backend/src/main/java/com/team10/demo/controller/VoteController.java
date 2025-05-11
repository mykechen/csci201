package com.team10.demo.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VoteController {
    private static final String SQLurl = ""; // Change
    private static final String SQLuser = ""; // Change
    private static final String SQLpassword = ""; // Change

    public VoteController() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    @PostMapping("/AddVote")
    public ResponseEntity<String> addVote(@RequestBody VoteRequest request) {
        Connection conn = null;
        PreparedStatement checkPs = null;
        PreparedStatement insertPs = null;
        PreparedStatement updatePs = null;
        ResultSet rs = null;
        
        try {
            conn = DriverManager.getConnection(SQLurl, SQLuser, SQLpassword);
            conn.setAutoCommit(false); 
            
            checkPs = conn.prepareStatement(
                "SELECT * FROM Voting WHERE user_id = ? AND recipe_id = ?"
            );
            checkPs.setString(1, request.getUserId());
            checkPs.setInt(2, request.getRecipeId());
            rs = checkPs.executeQuery();
            
            if (rs.next()) {
                conn.rollback();
                return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("You have already voted for this recipe.");
            }
            
            insertPs = conn.prepareStatement(
                "INSERT INTO Voting (user_id, recipe_id, timestamp) VALUES (?, ?, NOW())"
            );
            insertPs.setString(1, request.getUserId());
            insertPs.setInt(2, request.getRecipeId());
            int rowsInserted = insertPs.executeUpdate();
            
            updatePs = conn.prepareStatement(
                "UPDATE Recipe SET votes = votes + 1 WHERE recipe_id = ?"
            );
            updatePs.setInt(1, request.getRecipeId());
            int rowsUpdated = updatePs.executeUpdate();
            
            if (rowsInserted > 0 && rowsUpdated > 0) {
                conn.commit(); 
                return ResponseEntity.status(HttpStatus.CREATED)
                    .body("Vote added successfully.");
            } else {
                conn.rollback(); 
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to add vote.");
            }
            
        } catch (SQLException e) {
            try {
                if (conn != null) {
                    conn.rollback();
                }
            } catch (SQLException ex) {
                ex.printStackTrace();
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Database error: " + e.getMessage());
        } finally {
            try {
                if (rs != null) rs.close();
                if (checkPs != null) checkPs.close();
                if (insertPs != null) insertPs.close();
                if (updatePs != null) updatePs.close();
                if (conn != null) {
                    conn.setAutoCommit(true);
                    conn.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    @PostMapping("/RemoveVote")
    public ResponseEntity<String> removeVote(@RequestBody VoteRequest request) {
        Connection conn = null;
        PreparedStatement deletePs = null;
        PreparedStatement updatePs = null;
        
        try {
            conn = DriverManager.getConnection(SQLurl, SQLuser, SQLpassword);
            conn.setAutoCommit(false);
            
            deletePs = conn.prepareStatement(
                "DELETE FROM Voting WHERE user_id = ? AND recipe_id = ?"
            );
            deletePs.setString(1, request.getUserId());
            deletePs.setInt(2, request.getRecipeId());
            int rowsDeleted = deletePs.executeUpdate();
            
            if (rowsDeleted == 0) {
                conn.rollback();
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Vote not found.");
            }
            
            updatePs = conn.prepareStatement(
                "UPDATE Recipe SET votes = GREATEST(0, votes - 1) WHERE recipe_id = ?"
            );
            updatePs.setInt(1, request.getRecipeId());
            int rowsUpdated = updatePs.executeUpdate();
            
            if (rowsUpdated > 0) {
                conn.commit(); 
                return ResponseEntity.ok("Vote removed successfully.");
            } else {
                conn.rollback();
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to update recipe vote count.");
            }
            
        } catch (SQLException e) {
            try {
                if (conn != null) {
                    conn.rollback();
                }
            } catch (SQLException ex) {
                ex.printStackTrace();
            }
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Database error: " + e.getMessage());
        } finally {
            try {
                if (deletePs != null) deletePs.close();
                if (updatePs != null) updatePs.close();
                if (conn != null) {
                    conn.setAutoCommit(true);
                    conn.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
    }

    @GetMapping("/GetVotes/{recipeId}")
    public ResponseEntity<String> getVotes(@PathVariable int recipeId) {
        try (Connection conn = DriverManager.getConnection(SQLurl, SQLuser, SQLpassword);
             PreparedStatement ps = conn.prepareStatement(
                 "SELECT votes FROM Recipe WHERE recipe_id = ?"
             )) {
            
            ps.setInt(1, recipeId);
            ResultSet rs = ps.executeQuery();
            
            if (rs.next()) {
                int votes = rs.getInt("votes");
                return ResponseEntity.ok(String.valueOf(votes));
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Recipe not found.");
            }
            
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Database error: " + e.getMessage());
        }
    }
    
    @PostMapping("/HasVoted")
    public ResponseEntity<String> hasVoted(@RequestBody VoteRequest request) {
        try (Connection conn = DriverManager.getConnection(SQLurl, SQLuser, SQLpassword);
             PreparedStatement ps = conn.prepareStatement(
                 "SELECT * FROM Voting WHERE user_id = ? AND recipe_id = ?"
             )) {
            
            ps.setString(1, request.getUserId());
            ps.setInt(2, request.getRecipeId());
            ResultSet rs = ps.executeQuery();
            
            boolean hasVoted = rs.next();
            return ResponseEntity.ok(String.valueOf(hasVoted));
            
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body("Database error: " + e.getMessage());
        }
    }
}

class VoteRequest {
    private String userId;
    private int recipeId;
    
    public String getUserId() {
        return userId;
    }
    
    public void setUserId(String userId) {
        this.userId = userId;
    }
    
    public int getRecipeId() {
        return recipeId;
    }
    
    public void setRecipeId(int recipeId) {
        this.recipeId = recipeId;
    }
}