package com.team10.demo.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;


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

    private static final String domain = "@usc.edu";

    @PostMapping("/submit")
    public ResponseEntity<String> recipe(@RequestBody Recipe request) {

        Connection conn = null;
        Statement st = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        try (conn = DriverManager.getConnection(SQLurl, SQLuser, SQLpassword)) {
            // Check if user already exists
            st = conn.createStatement();
            ps = conn.prepareStatement();

        } catch (SQLException sqle) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error: " + sqle.getMessage());
        }

    }
    
}
