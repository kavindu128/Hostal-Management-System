package com.hostel_ms.backend.repository;

import com.hostel_ms.backend.entity.Allocation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AllocationRepository extends JpaRepository<Allocation,Long > {
    List<Allocation> findByStudentRegNo(String regNo);

    List<Allocation> findByRoomRoomNo(String roomNo);

    @Query("SELECT a FROM Allocation a WHERE a.status = 'ACTIVE'")
    List<Allocation> findActiveAllocations();

    @Query("SELECT a FROM Allocation a WHERE a.room.roomNo = :roomNo AND a.status = 'ACTIVE'")
    List<Allocation> findActiveAllocationsByRoom(@Param("roomNo") String roomNo);

    @Query("SELECT a FROM Allocation a WHERE a.student.regNo = :regNo AND a.status = 'ACTIVE'")
    Allocation findActiveAllocationByStudent(@Param("regNo") String regNo);

    @Query("SELECT COUNT(a) FROM Allocation a WHERE a.room.roomNo = :roomNo AND a.status = 'ACTIVE'")
    int countActiveAllocationsByRoom(@Param("roomNo") String roomNo);
}
