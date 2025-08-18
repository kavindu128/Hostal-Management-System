package com.hostel_ms.backend.service;

import com.hostel_ms.backend.entity.Student;

import java.util.List;

public interface StudentService {
    List<Student> getAllStudents();
    Student getStudentById(String regNo);
    Student createStudent(Student student);
    Student updateStudent(String regNo, Student studentDetails);
    void deleteStudent(String regNo);
}
