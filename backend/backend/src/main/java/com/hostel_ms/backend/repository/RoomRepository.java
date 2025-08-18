package com.hostel_ms.backend.repository;

import com.hostel_ms.backend.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoomRepository extends JpaRepository<Room, String> {
}
