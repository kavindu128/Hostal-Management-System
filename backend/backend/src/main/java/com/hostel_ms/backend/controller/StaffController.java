package com.hostel_ms.backend.controller;

import com.hostel_ms.backend.entity.Staff;
import com.hostel_ms.backend.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/staff")
@CrossOrigin(origins = "http://localhost:5173")
public class StaffController {

    @Autowired
    private StaffService staffService;

    @GetMapping
    public ResponseEntity<List<Staff>> getAllStaff() {
        return ResponseEntity.ok(staffService.getAllStaff());
    }

    @PostMapping
    public ResponseEntity<Staff> createStaff(@RequestBody Staff staff) {
        return ResponseEntity.ok(staffService.createStaff(staff));
    }

    @DeleteMapping("/{regNo}")
    public ResponseEntity<?> deleteStaff(@PathVariable String regNo) {
        staffService.deleteStaff(regNo);
        return ResponseEntity.ok().build();
    }
}
