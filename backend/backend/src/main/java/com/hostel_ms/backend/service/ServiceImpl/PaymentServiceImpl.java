package com.hostel_ms.backend.service.ServiceImpl;

import com.hostel_ms.backend.entity.Payment;
import com.hostel_ms.backend.repository.PaymentRepository;
import com.hostel_ms.backend.service.PaymentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PaymentServiceImpl implements PaymentService {
    @Autowired
    private PaymentRepository paymentRepository;

    @Override
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @Override
    public Payment createPayment(Payment payment) {
        // Set the current date
        payment.setDate(LocalDate.now());
        return paymentRepository.save(payment);
    }

}
