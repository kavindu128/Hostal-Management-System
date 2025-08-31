package com.hostel_ms.backend;

import com.hostel_ms.backend.entity.User;
import com.hostel_ms.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

@Component
public class DataInitializer implements CommandLineRunner {

    @Autowired
    private UserRepository userRepository;

    @Override
    public void run(String... args) throws Exception {
        // Create default admin user if it doesn't exist
        if (userRepository.findById("admin").isEmpty()) {
            User adminUser = new User();
            adminUser.setUsername("admin");
            adminUser.setPassword("admin");
            adminUser.setRole("admin");
            userRepository.save(adminUser);
            System.out.println("Default admin user created (username: admin, password: admin)");
        }
    }
}
