package com.hostel_ms.backend.controller;

import com.hostel_ms.backend.entity.User;
import com.hostel_ms.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private static final Logger logger = Logger.getLogger(AuthController.class.getName());

    @Autowired
    private UserRepository userRepository;



    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        try {
            String username = credentials.get("username");
            String password = credentials.get("password");

            logger.log(Level.INFO, "Login attempt for username: " + username);

            if (username == null || password == null) {
                return ResponseEntity.badRequest().body(Map.of("error", "Username and password are required"));
            }

            Optional<User> userOptional = userRepository.findById(username);

            if (userOptional.isPresent()) {
                User user = userOptional.get();
                if (user.getPassword().equals(password)) {
                    logger.log(Level.INFO, "Login successful for username: " + username);

                    return ResponseEntity.ok().body(Map.of(
                            "username", user.getUsername(),
                            "role", user.getRole(),
                            "message", "Login successful"
                    ));
                } else {
                    logger.log(Level.WARNING, "Invalid password for username: " + username);
                }
            } else {
                logger.log(Level.WARNING, "User not found: " + username);
            }

            return ResponseEntity.status(401).body(Map.of("error", "Invalid credentials"));
        } catch (Exception e) {
            logger.log(Level.SEVERE, "Error during login: " + e.getMessage(), e);
            return ResponseEntity.status(500).body(Map.of("error", "Internal server error: " + e.getMessage()));
        }
    }
}