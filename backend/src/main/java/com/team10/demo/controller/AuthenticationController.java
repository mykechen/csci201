package com.team10.demo.controller;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;


import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthenticationController {
    private static final Logger log = LoggerFactory.getLogger(AuthenticationController.class);


    private static final String SQLurl = "jdbc:mysql://localhost:3306/trojanbites?serverTimezone=UTC"; // Change
    private static final String SQLuser = "root"; // Change
    private static final String SQLpassword = "jerryzhang123!"; // Change

    private static final String domain = "@usc.edu";

    public AuthenticationController () {

    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User request) {

        log.info("got to /signup")

        String email = request.getUserEmail();
        String password = request.getUserPass();

        Connection conn = null;
        Statement st = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        //user domain is not @usc.edu
        if (!email.endsWith(domain)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Please use a " + domain + " email address.");
        }

        try{

            //check if user already exists
            conn = DriverManager.getConnection(SQLurl, SQLuser, SQLpassword);
            st = conn.createStatement();
            ps = conn.prepareStatement("SELECT * from `User` WHERE user_id = ?");
            ps.setString(1, email);
            rs = ps.executeQuery();

            if (rs.next()) {
                return ResponseEntity.status(HttpStatus.CONFLICT).body("User with this email address already exists.");
            }

            //else: register user to database + hash password
            BCryptPasswordEncoder hash = new BCryptPasswordEncoder();
            String hashedPassword = hash.encode(password);

            ps = conn.prepareStatement("INSERT INTO `User` (user_id, password) VALUES (?, ?)");
            ps.setString(1, email);
            ps.setString(2, hashedPassword);
            ps.executeUpdate();

            return ResponseEntity.status(HttpStatus.CREATED).body("Successfully registered user");

        } catch (SQLException sqle) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error: " + sqle.getMessage());

        } finally {

            try {

                if (rs != null) { rs.close(); }
                if (st != null) { st.close(); }
                if (ps != null) { ps.close();}
                if (conn != null) { conn.close(); }

            } catch (SQLException sqle) {

                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error: " + sqle.getMessage());

            }
        }

    }


    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User request) {

        String email = request.getUserEmail();
        String password = request.getUserPass();

        Connection conn = null;
        Statement st = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        try {
            conn = DriverManager.getConnection(SQLurl, SQLuser, SQLpassword);
            st = conn.createStatement();

            //check for email/password in database

            BCryptPasswordEncoder hash = new BCryptPasswordEncoder();

            ps = conn.prepareStatement("SELECT * from `User` WHERE user_id = ?");
            ps.setString(1, email);
            rs = ps.executeQuery();

            if (!rs.next()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
            }

            String dbPass = rs.getString("password");

            if (!hash.matches(password, dbPass)) { 
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Password does not match."); 
            }

            return ResponseEntity.status(HttpStatus.OK).body("User successfully logged in");

        } catch (SQLException sqle) {

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error: " + sqle.getMessage());
        
        } finally {

            try {

                if (rs != null) { rs.close(); }
                if (st != null) { st.close(); }
                if (ps != null) { ps.close();}
                if (conn != null) { conn.close(); }

            } catch (SQLException sqle) {

                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error: " + sqle.getMessage());

            }

        }

    }


}
