package com.hostel_ms.backend.service.ServiceImpl;

import com.hostel_ms.backend.entity.Visitor;
import com.hostel_ms.backend.repository.VisitorRepository;
import com.hostel_ms.backend.service.VisitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class VisitorServiceImpl implements VisitorService {
    @Autowired
    private VisitorRepository visitorRepository;

    @Override
    public List<Visitor> getAllVisitors() {
        return visitorRepository.findAll();
    }

    @Override
    public Visitor createVisitor(Visitor visitor) {
        visitor.setEntryTime(LocalDateTime.now());
        return visitorRepository.save(visitor);
    }

    @Override
    public Visitor recordExitTime(Long visitorId) {
        Visitor visitor = visitorRepository.findById(visitorId)
                .orElseThrow(() -> new RuntimeException("Visitor not found"));
        visitor.setExitTime(LocalDateTime.now());
        return visitorRepository.save(visitor);
    }
}
