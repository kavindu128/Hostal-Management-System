package com.hostel_ms.backend.controller;

import com.hostel_ms.backend.entity.Allocation;
import com.hostel_ms.backend.service.AllocationService;
import org.jetbrains.annotations.NotNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/allocations")
@CrossOrigin(origins = "http://localhost:5173")
public class AllocationController {

    @Autowired
    private AllocationService allocationService;

    @GetMapping
    public ResponseEntity<List<Allocation>> getAllAllocations() {
        return ResponseEntity.ok(allocationService.getAllAllocations());
    }

    @GetMapping("/active")
    public ResponseEntity<List<Allocation>> getActiveAllocations() {
        return ResponseEntity.ok(allocationService.getActiveAllocations());
    }

    @GetMapping("/student/{regNo}")
    public ResponseEntity<List<Allocation>> getAllocationsByStudent(@PathVariable String regNo) {
        return ResponseEntity.ok(allocationService.getAllocationsByStudent(regNo));
    }

    @GetMapping("/room/{roomNo}")
    public ResponseEntity<List<Allocation>> getAllocationsByRoom(@PathVariable String roomNo) {
        return ResponseEntity.ok(allocationService.getAllocationsByRoom(roomNo));
    }

    @GetMapping("/{allocId}")
    public ResponseEntity<Allocation> getAllocationById(@PathVariable Long allocId) {
        return ResponseEntity.ok(allocationService.getAllocationById(allocId));
    }

    @PostMapping
    public ResponseEntity<Allocation> allocateRoom(@RequestBody @NotNull Map<String, Object> request) {
        String regNo = (String) request.get("regNo");
        String roomNo = (String) request.get("roomNo");
        LocalDate dateFrom = LocalDate.parse((String) request.get("dateFrom"));
        LocalDate dateTo = LocalDate.parse((String) request.get("dateTo"));

        return ResponseEntity.ok(allocationService.allocateRoom(regNo, roomNo, dateFrom, dateTo));
    }
    @DeleteMapping("/{allocId}")
    public ResponseEntity<?> deallocateRoom(@PathVariable Long allocId) {
        try {
            allocationService.deallocateRoom(allocId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Allocation not found with ID: " + allocId);
        }
    }

    @PatchMapping("/{allocId}/dates")
    public ResponseEntity<Allocation> updateAllocationDates(
            @PathVariable Long allocId,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateFrom,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dateTo) {
        return ResponseEntity.ok(allocationService.updateAllocationDates(allocId, dateFrom, dateTo));
    }
}

