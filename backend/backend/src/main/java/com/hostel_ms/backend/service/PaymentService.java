package com.hostel_ms.backend.service;

import com.hostel_ms.backend.entity.Payment;

import java.util.List;

public interface PaymentService {
    List<Payment> getAllPayments();
    Payment createPayment(Payment payment);
}
