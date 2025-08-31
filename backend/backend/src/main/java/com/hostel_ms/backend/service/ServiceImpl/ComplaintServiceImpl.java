package com.hostel_ms.backend.service.ServiceImpl;

import com.hostel_ms.backend.entity.Complaint;
import com.hostel_ms.backend.repository.ComplaintRepository;
import com.hostel_ms.backend.service.ComplaintService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ComplaintServiceImpl implements ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepository;

    @Override
    public List<Complaint> getAllComplaints() {
        return complaintRepository.findAll();
    }

    @Override
    public Complaint createComplaint(Complaint complaint) {
        // Set the current date
        complaint.setDate(LocalDate.now());
        return complaintRepository.save(complaint);
    }

}
