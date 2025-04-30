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
//import org.springframework.security.crypto.password.Pbkdf2PasswordEncoder;

@RestController
public class AuthenticationController {

    private static final String SQLurl = ""; // Change
    private static final String SQLuser = ""; // Change
    private static final String SQLpassword = ""; // Change

    private static final String domain = "@usc.edu";

    public AuthenticationController () {

    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User request) {

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
            //Pbkdf2PasswordEncoder pwEncoder = new Pbkdf2PasswordEncoder();

            ps = conn.prepareStatement("INSERT INTO `User` (user_id, password) VALUES (?, ?)");
            ps.setString(1, email);
            ps.setString(2, password);
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

            /*here would be where you hash the password that was input before searching for it*/

            ps = conn.prepareStatement("SELECT * from `User` WHERE user_id = ? AND password = ?");
            ps.setString(1, email);
            ps.setString(2, password);
            rs = ps.executeQuery();

            if (!rs.next()) {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User and/or password not found");
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
