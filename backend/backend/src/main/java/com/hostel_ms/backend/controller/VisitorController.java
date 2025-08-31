package com.hostel_ms.backend.controller;

import com.hostel_ms.backend.entity.Visitor;
import com.hostel_ms.backend.service.VisitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/visitors")
@CrossOrigin(origins = "http://localhost:5173")
public class VisitorController {

    @Autowired
    private VisitorService visitorService;

    @GetMapping
    public ResponseEntity<List<Visitor>> getAllVisitors() {
        try {
            List<Visitor> visitors = visitorService.getAllVisitors();
            return ResponseEntity.ok(visitors);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping
    public ResponseEntity<Visitor> createVisitor(@RequestBody Visitor visitor) {
        try {
            Visitor createdVisitor = visitorService.createVisitor(visitor);
            return ResponseEntity.ok(createdVisitor);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping("/{visitorId}/exit")
    public ResponseEntity<Visitor> recordExitTime(@PathVariable Long visitorId) {
        try {
            Visitor updatedVisitor = visitorService.recordExitTime(visitorId);
            return ResponseEntity.ok(updatedVisitor);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
