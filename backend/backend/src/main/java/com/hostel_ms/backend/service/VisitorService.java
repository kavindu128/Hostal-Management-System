package com.hostel_ms.backend.service;

import com.hostel_ms.backend.entity.Visitor;

import java.util.List;

public interface VisitorService {
    List<Visitor> getAllVisitors();
    Visitor createVisitor(Visitor visitor);
    Visitor recordExitTime(Long visitorId);
}
