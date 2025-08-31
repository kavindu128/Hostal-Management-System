package com.hostel_ms.backend.service;

import com.hostel_ms.backend.entity.Complaint;

import java.util.List;

public interface ComplaintService {
    List<Complaint> getAllComplaints();
    Complaint createComplaint(Complaint complaint);
}
