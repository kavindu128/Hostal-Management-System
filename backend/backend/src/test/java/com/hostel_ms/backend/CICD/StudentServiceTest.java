package com.hostel_ms.backend.CICD;

import com.hostel_ms.backend.entity.Student;
import com.hostel_ms.backend.repository.StudentRepository;
import com.hostel_ms.backend.service.ServiceImpl.StudentImpl;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class StudentServiceTest {

    @Mock
    private StudentRepository studentRepository;

    @InjectMocks
    private StudentImpl studentService;

    @Test
    void testCreateStudent() {
        Student student = new Student();
        student.setRegNo("TEST001");
        student.setFullName("Test Student");

        when(studentRepository.save(any(Student.class))).thenReturn(student);

        Student savedStudent = studentService.createStudent(student);

        assertNotNull(savedStudent);
        assertEquals("TEST001", savedStudent.getRegNo());
    }
}