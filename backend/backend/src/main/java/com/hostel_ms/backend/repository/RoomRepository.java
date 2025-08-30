package com.hostel_ms.backend.repository;

import com.hostel_ms.backend.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RoomRepository extends JpaRepository<Room, String> {
    List<Room> findByHostelName(String hostelName);

    @Query("SELECT r FROM Room r WHERE r.status = 'AVAILABLE'")
    List<Room> findAvailableRooms();

    @Query("SELECT r FROM Room r WHERE r.hostelName = :hostelName AND r.status = 'AVAILABLE'")
    List<Room> findAvailableRoomsByHostel(@Param("hostelName") String hostelName);

    @Query("SELECT COUNT(a) FROM Allocation a WHERE a.room.roomNo = :roomNo AND a.status = 'ACTIVE'")
    int countActiveAllocationsByRoom(@Param("roomNo") String roomNo);

}
