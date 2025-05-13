package com.team10.demo.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthenticationController {

    private static final String SQLurl = "jdbc:mysql://localhost/trojanbites"; // Change
    private static final String SQLuser = "root"; // Change
    private static final String SQLpassword = "Kapil$2259360427"; // Change

    private static final String domain = "@usc.edu";

    public static class User {
        private String userEmail;
        private String userPass;

        public String getUserEmail() {
            return userEmail;
        }

        public void setUserEmail(String userEmail) {
            this.userEmail = userEmail;
        }

        public String getUserPass() {
            return userPass;
        }

        public void setUserPass(String userPass) {
            this.userPass = userPass;
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User request) {
        String email = request.getUserEmail();
        String password = request.getUserPass();

        if (!email.endsWith(domain)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Please use a " + domain + " email address.");
        }

        try (Connection conn = DriverManager.getConnection(SQLurl, SQLuser, SQLpassword)) {
            // Check if user already exists
            try (PreparedStatement checkStmt = conn.prepareStatement("SELECT * FROM `User` WHERE user_id = ?")) {
                checkStmt.setString(1, email);
                ResultSet rs = checkStmt.executeQuery();
                if (rs.next()) {
                    return ResponseEntity.status(HttpStatus.CONFLICT)
                            .body("User with this email address already exists.");
                }
            }

            // Register new user
            try (PreparedStatement insertStmt =
                         conn.prepareStatement("INSERT INTO `User` (user_id, password) VALUES (?, ?)")) {
                insertStmt.setString(1, email);
                insertStmt.setString(2, password); // use hashed passwords in production!
                insertStmt.executeUpdate();
            }

            return ResponseEntity.status(HttpStatus.CREATED).body("Successfully registered user");
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Database error: " + e.getMessage());
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User request) {
        String email = request.getUserEmail();
        String password = request.getUserPass();

        try (Connection conn = DriverManager.getConnection(SQLurl, SQLuser, SQLpassword)) {
            try (PreparedStatement ps =
                         conn.prepareStatement("SELECT * FROM `User` WHERE user_id = ? AND password = ?")) {
                ps.setString(1, email);
                ps.setString(2, password);
                ResultSet rs = ps.executeQuery();

                if (!rs.next()) {
                    return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                            .body("User and/or password not found");
                }
                return ResponseEntity.ok("User successfully logged in");
            }
        } catch (SQLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Database error: " + e.getMessage());
        }
    }
}
