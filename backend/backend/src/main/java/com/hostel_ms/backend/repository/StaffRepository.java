package com.hostel_ms.backend.repository;

import com.hostel_ms.backend.entity.Staff;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StaffRepository extends JpaRepository<Staff, String > {
}
