package com.hostel_ms.backend.service.ServiceImpl;

import com.hostel_ms.backend.entity.Room;
import com.hostel_ms.backend.repository.RoomRepository;
import com.hostel_ms.backend.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoomServiceImpl implements RoomService {
    @Autowired
    private RoomRepository roomRepository;

    @Override
    public List<Room> getAllRooms() {
        return roomRepository.findAll();
    }

    @Override
    public List<Room> getAvailableRooms() {
        return roomRepository.findAvailableRooms();
    }

    @Override
    public List<Room> getRoomsByHostel(String hostelName) {
        return roomRepository.findByHostelName(hostelName);
    }

    @Override
    public List<Room> getAvailableRoomsByHostel(String hostelName) {
        return roomRepository.findAvailableRoomsByHostel(hostelName);
    }

    @Override
    public Room getRoomByRoomNo(String roomNo) {
        return roomRepository.findById(roomNo)
                .orElseThrow(() -> new RuntimeException("Room not found with number: " + roomNo));
    }

    @Override
    public Room updateRoomStatus(String roomNo, String status) {
        Room room = getRoomByRoomNo(roomNo);
        room.setStatus(status);
        return roomRepository.save(room);
    }

    @Override
    public Room createRoom(Room room) {
        // Check if room already exists
        if (roomRepository.existsById(room.getRoomNo())) {
            throw new RuntimeException("Room already exists with number: " + room.getRoomNo());
        }
        return roomRepository.save(room);
    }

    @Override
    public void deleteRoom(String roomNo) {
        Room room = getRoomByRoomNo(roomNo);
        roomRepository.delete(room);
    }
}
