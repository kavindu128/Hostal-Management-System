package com.hostel_ms.backend.service.ServiceImpl;

import com.hostel_ms.backend.entity.Allocation;
import com.hostel_ms.backend.entity.Room;
import com.hostel_ms.backend.entity.Student;
import com.hostel_ms.backend.repository.AllocationRepository;
import com.hostel_ms.backend.repository.RoomRepository;
import com.hostel_ms.backend.repository.StudentRepository;
import com.hostel_ms.backend.service.AllocationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class AllocationServiceImpl implements AllocationService {

    @Autowired
    private AllocationRepository allocationRepository;

    @Autowired
    private RoomRepository roomRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public List<Allocation> getAllAllocations() {
        return allocationRepository.findAll();
    }

    @Override
    public List<Allocation> getAllocationsByStudent(String regNo) {
        return allocationRepository.findByStudentRegNo(regNo);
    }

    @Override
    public List<Allocation> getAllocationsByRoom(String roomNo) {
        return allocationRepository.findByRoomRoomNo(roomNo);
    }

    @Override
    public List<Allocation> getActiveAllocations() {
        return allocationRepository.findActiveAllocations();
    }

    @Override
    public Allocation getAllocationById(Long allocId) {
        return allocationRepository.findById(allocId)
                .orElseThrow(() -> new RuntimeException("Allocation not found with ID: " + allocId));
    }

    @Override
    public Allocation allocateRoom(String regNo, String roomNo, LocalDate dateFrom, LocalDate dateTo) {

        Student student = studentRepository.findById(regNo)
                .orElseThrow(() -> new RuntimeException("Student not found with registration number: " + regNo));


        Room room = roomRepository.findById(roomNo)
                .orElseThrow(() -> new RuntimeException("Room not found with number: " + roomNo));


        if (!"AVAILABLE".equals(room.getStatus())) {
            throw new RuntimeException("Room is not available for allocation");
        }


        Allocation existingAllocation = allocationRepository.findActiveAllocationByStudent(regNo);
        if (existingAllocation != null) {
            throw new RuntimeException("Student already has an active room allocation");
        }


        int activeAllocations = roomRepository.countActiveAllocationsByRoom(roomNo);
        if (activeAllocations >= room.getCapacity()) {
            throw new RuntimeException("Room has reached maximum capacity");
        }


        Allocation allocation = new Allocation();
        allocation.setStudent(student);
        allocation.setRoom(room);
        allocation.setDateFrom(dateFrom);
        allocation.setDateTo(dateTo);
        allocation.setStatus("ACTIVE");


        if (activeAllocations + 1 >= room.getCapacity()) {
            room.setStatus("OCCUPIED");
            roomRepository.save(room);
        }

        return allocationRepository.save(allocation);
    }

    @Override
    public void deallocateRoom(Long allocId) {
        Allocation allocation = getAllocationById(allocId);
        allocation.setStatus("INACTIVE");
        allocationRepository.save(allocation);


        Room room = allocation.getRoom();
        int activeAllocations = roomRepository.countActiveAllocationsByRoom(room.getRoomNo());

        if (activeAllocations < room.getCapacity()) {
            room.setStatus("AVAILABLE");
            roomRepository.save(room);
        }
    }

    @Override
    public Allocation updateAllocationDates(Long allocId, LocalDate dateFrom, LocalDate dateTo) {
        Allocation allocation = getAllocationById(allocId);
        allocation.setDateFrom(dateFrom);
        allocation.setDateTo(dateTo);
        return allocationRepository.save(allocation);
    }
}