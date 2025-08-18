package com.hostel_ms.backend.repository;

import com.hostel_ms.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, String> {
}
