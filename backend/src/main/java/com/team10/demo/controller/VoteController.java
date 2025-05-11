package com.team10.demo.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;
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
    public void addVote() {
        try (Connection conn = DriverManager.getConnection(SQLurl, SQLuser, SQLpassword)) {
            PreparedStatement ps = conn.prepareStatement("UPDATE recipes (user_email, artist_id) VALUES (?, ?)");
            PreparedStatement Ts = conn.prepareStatement("INSERT INTO favorites (user_email, artist_id) VALUES (?, ?)");
            ps.setString(1, email);
            ps.setString(2, artistId);
            ps.executeUpdate();

        } catch (SQLException e) {

        }
    }

    @PostMapping("/RemoveVote")
    public void removeVote() {
        try (Connection conn = DriverManager.getConnection(SQLurl, SQLuser, SQLpassword)) {
            PreparedStatement ps = conn.prepareStatement("INSERT INTO favorites (user_email, artist_id) VALUES (?, ?)");
            ps.setString(1, email);
            ps.setString(2, artistId);
            ps.executeUpdate();

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