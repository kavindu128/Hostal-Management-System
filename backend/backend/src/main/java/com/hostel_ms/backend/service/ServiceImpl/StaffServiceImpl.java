package com.hostel_ms.backend.service.ServiceImpl;

import com.hostel_ms.backend.entity.Staff;
import com.hostel_ms.backend.repository.StaffRepository;
import com.hostel_ms.backend.service.StaffService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StaffServiceImpl implements StaffService {
    @Autowired
    private StaffRepository staffRepository;

    @Override
    public List<Staff> getAllStaff() {
        return staffRepository.findAll();
    }

    @Override
    public Staff createStaff(Staff staff) {
        // Check if staff with this regNo already exists
        if (staffRepository.existsById(staff.getRegNo())) {
            throw new RuntimeException("Staff member with regNo " + staff.getRegNo() + " already exists");
        }
        return staffRepository.save(staff);
    }

    @Override
    public void deleteStaff(String regNo) {
        Staff staff = staffRepository.findById(regNo)
                .orElseThrow(() -> new RuntimeException("Staff not found with regNo: " + regNo));
        staffRepository.delete(staff);
    }
}

