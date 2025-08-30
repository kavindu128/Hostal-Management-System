package com.hostel_ms.backend.service;

import com.hostel_ms.backend.entity.Allocation;

import java.time.LocalDate;
import java.util.List;

public interface AllocationService {
    List<Allocation> getAllAllocations();
    List<Allocation> getAllocationsByStudent(String regNo);
    List<Allocation> getAllocationsByRoom(String roomNo);
    List<Allocation> getActiveAllocations();
    Allocation getAllocationById(Long allocId);
    Allocation allocateRoom(String regNo, String roomNo, LocalDate dateFrom, LocalDate dateTo);
    void deallocateRoom(Long allocId);
    Allocation updateAllocationDates(Long allocId, LocalDate dateFrom, LocalDate dateTo);
}
