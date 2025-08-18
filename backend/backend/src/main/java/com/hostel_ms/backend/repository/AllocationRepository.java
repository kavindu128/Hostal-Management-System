package com.hostel_ms.backend.repository;

import com.hostel_ms.backend.entity.Allocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AllocationRepository extends JpaRepository<Allocation,Long > {
    @Query("SELECT a FROM Allocation a JOIN FETCH a.student JOIN FETCH a.room WHERE a.room.roomNo = :roomNo")
    List<Allocation> findByRoomRoomNo(@Param("roomNo") String roomNo);

    @Query("SELECT a FROM Allocation a JOIN FETCH a.room WHERE a.student.regNo = :regNo")
    List<Allocation> findByStudentRegNo(@Param("regNo") String regNo);
}
