package com.hostel_ms.backend.service;

import com.hostel_ms.backend.dto.StudentDto;

import java.util.List;

public interface StudentService {
    StudentDto createStudent(StudentDto studentDto);

    StudentDto getStudentByRegName(String regName);

    List<StudentDto> getAllStudent();

    StudentDto updateStudent(String regNo,StudentDto updatedStudent);

    void deleteStudent(String regNo);
}
