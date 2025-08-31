package com.hostel_ms.backend.service;

import com.hostel_ms.backend.entity.Staff;

import java.util.List;

public interface StaffService {

    List<Staff> getAllStaff();
    Staff createStaff(Staff staff);
    void deleteStaff(String regNo);
}
