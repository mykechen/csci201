package com.team10.demo.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/vote")
public class VoteController {
    private static final String SQLurl = "jdbc:mysql://localhost/trojanbites"; // Change
    private static final String SQLuser = "root"; // Change
    private static final String SQLpassword = "Kapil$2259360427"; // Change

    public VoteController() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    @PostMapping("/AddVote")
    public ResponseEntity<String> addVote(@RequestBody VoteRequest request) {
        try (Connection conn = DriverManager.getConnection(SQLurl, SQLuser, SQLpassword)) {
            String UserName = request.getUserId();
            int recipeId = request.getRecipeId();
            PreparedStatement UserVoteCheck = conn.prepareStatement("SELECT * FROM Voting WHERE user_id = ? AND recipe_id = ? VALUES (?, ?)");
            UserVoteCheck.setString(1, UserName);
            UserVoteCheck.setInt(2, recipeId);
            ResultSet rs = UserVoteCheck.executeQuery();

            if(!rs.next()) {
                // User has already voted
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("This user has already voted for this recipe.");
            }

            PreparedStatement RecipeVoteUpdate = conn.prepareStatement("UPDATE Recipe SET votes = votes + 1; WHERE user_id = ? AND recipe_id = ? VALUES (?, ?)");
            PreparedStatement VotingTableUpdate = conn.prepareStatement("INSERT INTO Voting (user_id, recipe_id) VALUES (?, ?)");
            RecipeVoteUpdate.setString(1, UserName);
            RecipeVoteUpdate.setInt(2, recipeId);
            VotingTableUpdate.setString(1, UserName);
            VotingTableUpdate.setInt(2, recipeId);
            RecipeVoteUpdate.executeUpdate();
            VotingTableUpdate.executeUpdate();
            conn.close();
            return ResponseEntity.status(HttpStatus.OK).body("Vote added successfully.");
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error: " + e.getMessage());
        }
    }

    @PostMapping("/RemoveVote")
    public ResponseEntity<String> removeVote(@RequestBody VoteRequest request) {
        try (Connection conn = DriverManager.getConnection(SQLurl, SQLuser, SQLpassword)) {
            String UserName = request.getUserId();
            int recipeId = request.getRecipeId();
            PreparedStatement UserVoteCheck = conn.prepareStatement("SELECT * FROM Voting WHERE user_id = ? AND recipe_id = ? VALUES (?, ?)");
            UserVoteCheck.setString(1, UserName);
            UserVoteCheck.setInt(2, recipeId);
            ResultSet rs = UserVoteCheck.executeQuery();

            if(!rs.next()) {
                // User has already voted
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("This user hasn't voted for this recipe.");
            }

            PreparedStatement RecipeVoteUpdate = conn.prepareStatement("UPDATE Recipe SET votes = votes - 1; WHERE user_id = ? AND recipe_id = ? VALUES (?, ?)");
            PreparedStatement VotingTableUpdate = conn.prepareStatement("DELETE FROM Voting  WHERE user_id = ? AND recipe_id = ? VALUES (?, ?)");
            RecipeVoteUpdate.setString(1, UserName);
            RecipeVoteUpdate.setInt(2, recipeId);
            VotingTableUpdate.setString(1, UserName);
            VotingTableUpdate.setInt(2, recipeId);
            RecipeVoteUpdate.executeUpdate();
            VotingTableUpdate.executeUpdate();
            conn.close();
            return ResponseEntity.status(HttpStatus.OK).body("Vote removed successfully.");
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error: " + e.getMessage());
        }
    }

    @GetMapping("/GetVotes")
    public ResponseEntity<String>  getVotes(@RequestBody VoteRequest request) {
        try (Connection conn = DriverManager.getConnection(SQLurl, SQLuser, SQLpassword)) {
            String UserName = request.getUserId();
            PreparedStatement GetUserVotes = conn.prepareStatement("SELECT recipe_id FROM Voting WHERE user_id = ? VALUES (?)");
            GetUserVotes.setString(1, UserName);
            ResultSet votes = GetUserVotes.executeQuery();
            conn.close();
            return ResponseEntity.status(HttpStatus.OK).body(votes.toString());
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error: " + e.getMessage());
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