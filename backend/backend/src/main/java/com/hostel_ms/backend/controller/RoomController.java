package com.hostel_ms.backend.controller;

import com.hostel_ms.backend.entity.Room;
import com.hostel_ms.backend.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/rooms")
@CrossOrigin(origins = "http://localhost:5173")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @GetMapping
    public ResponseEntity<List<Room>> getAllRooms() {
        return ResponseEntity.ok(roomService.getAllRooms());
    }

    @GetMapping("/available")
    public ResponseEntity<List<Room>> getAvailableRooms() {
        return ResponseEntity.ok(roomService.getAvailableRooms());
    }

    @GetMapping("/hostel/{hostelName}")
    public ResponseEntity<List<Room>> getRoomsByHostel(@PathVariable String hostelName) {
        return ResponseEntity.ok(roomService.getRoomsByHostel(hostelName));
    }

    @GetMapping("/available/hostel/{hostelName}")
    public ResponseEntity<List<Room>> getAvailableRoomsByHostel(@PathVariable String hostelName) {
        return ResponseEntity.ok(roomService.getAvailableRoomsByHostel(hostelName));
    }

    @GetMapping("/{roomNo}")
    public ResponseEntity<Room> getRoomByRoomNo(@PathVariable String roomNo) {
        return ResponseEntity.ok(roomService.getRoomByRoomNo(roomNo));
    }

    @PatchMapping("/{roomNo}/status")
    public ResponseEntity<Room> updateRoomStatus(@PathVariable String roomNo, @RequestBody Map<String, String> request) {
        String status = request.get("status");
        return ResponseEntity.ok(roomService.updateRoomStatus(roomNo, status));
    }

    @PostMapping
    public ResponseEntity<Room> createRoom(@RequestBody Room room) {
        return ResponseEntity.ok(roomService.createRoom(room));
    }

    @DeleteMapping("/{roomNo}")
    public ResponseEntity<?> deleteRoom(@PathVariable String roomNo) {
        roomService.deleteRoom(roomNo);
        return ResponseEntity.ok().build();
    }
}