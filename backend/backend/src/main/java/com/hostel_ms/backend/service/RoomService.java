package com.hostel_ms.backend.service;

import com.hostel_ms.backend.entity.Room;

import java.util.List;

public interface RoomService {
    List<Room> getAllRooms();
    List<Room> getAvailableRooms();
    List<Room> getRoomsByHostel(String hostelName);
    List<Room> getAvailableRoomsByHostel(String hostelName);
    Room getRoomByRoomNo(String roomNo);
    Room updateRoomStatus(String roomNo, String status);
    Room createRoom(Room room);
    void deleteRoom(String roomNo);
}
