import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import java.sql.*;
import com.example.auth.*;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/auth");
public class AuthenticationController {

    private static final String SQLurl = ""; // Change
    private static final String SQLuser = ""; // Change
    private static final String SQLpassword = ""; // Change

    private static final String domain = "@usc.edu";

    public AuthenticationController () {

    }

    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody User request) {

        Connection conn = null;
        Statement st = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        try (conn = DriverManager.getConnection(SQLurl, SQLuser, SQLpassword)) {

            //check if user already exists
            st = conn.createStatement();
            ps = conn.prepareStatement();

        } catch (SQLException sqle) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error: " + sqle.getMessage());
        }

    }


    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User request) {

        Connection conn = null;
        Statement st = null;
        PreparedStatement ps = null;
        ResultSet rs = null;

        try (conn = DriverManager.getConnection(SQLurl, SQLuser, SQLpassword)) {

            st = conn.createStatement();
            ps = conn.prepareStatement();

        } catch (SQLException sqle) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Database error: " + sqle.getMessage());
        }

    }


}
