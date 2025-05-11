package com.team10.demo.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.ResultSet;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class VoteController {
    private static final String SQLurl = "Our SQL URL"; // Change
    private static final String SQLuser = "Our SQL Username"; // Change
    private static final String SQLpassword = "Our SQL Password"; // Change

    public VoteController() {
        try {
            Class.forName("com.mysql.cj.jdbc.Driver");
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        }
    }

    @PostMapping("/AddVote")
    public ResponseEntity<String> addVote(@RequestBody Recipe request) {
        try (Connection conn = DriverManager.getConnection(SQLurl, SQLuser, SQLpassword)) {
            PreparedStatement UserVoteCheck = conn.prepareStatement("SELECT * FROM Voting WHERE user_id = ? AND recipe_id = ? VALUES (?, ?)");
            UserVoteCheck.setString(1, UserName);
            UserVoteCheck.setInt(2, recipeId);
            ResultSet rs = UserVoteCheck.executeQuery();

            if(!rs.next()) {
                // User has already voted
                return;
            }

            PreparedStatement RecipeVoteUpdate = conn.prepareStatement("UPDATE Recipe SET votes = votes + 1; WHERE user_id = ? AND recipe_id = ? VALUES (?, ?)");
            PreparedStatement VotingTableUpdate = conn.prepareStatement("INSERT INTO Voting (user_id, recipe_id) VALUES (?, ?)");
            RecipeVoteUpdate.setString(1, UserName);
            RecipeVoteUpdate.setInt(2, recipeId);
            VotingTableUpdate.setString(1, UserName);
            VotingTableUpdate.setInt(2, recipeId);
            RecipeVoteUpdate.executeUpdate();
            VotingTableUpdate.executeUpdate();
        return ResponseEntity.status(HttpStatus.CREATED).body("Recipe submitted successfully.");

        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @PostMapping("/RemoveVote")
    public ResponseEntity<String> removeVote(String UserName, int recipeId) {
        try (Connection conn = DriverManager.getConnection(SQLurl, SQLuser, SQLpassword)) {
            PreparedStatement ps = conn.prepareStatement("INSERT INTO favorites (user_email, artist_id) VALUES (?, ?)");
            ps.setString(1, email);
            ps.setString(2, artistId);
            ps.executeUpdate();

            return ResponseEntity.status(HttpStatus.CREATED).body("Recipe submitted successfully.");

        } catch (SQLException e) {

        }
    }

    @GetMapping("/GetVotes")
    public void getVotes(@RequestBody String name) {
        try (Connection conn = DriverManager.getConnection(SQLurl, SQLuser, SQLpassword)) {
            PreparedStatement ps = conn.prepareStatement("INSERT INTO favorites (user_email, artist_id) VALUES (?, ?)");
            ps.setString(1, email);
            ps.setString(2, artistId);
            ps.executeUpdate();

            

        } catch (SQLException e) {

        }
    }
}