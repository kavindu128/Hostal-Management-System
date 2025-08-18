package com.hostel_ms.backend.repository;

import com.hostel_ms.backend.entity.Visitor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VisitorRepository extends JpaRepository<Visitor, Long> {
}
