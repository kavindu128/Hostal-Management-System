package com.hostel_ms.backend.repository;

import com.hostel_ms.backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepository extends JpaRepository<Student, String> {
}
