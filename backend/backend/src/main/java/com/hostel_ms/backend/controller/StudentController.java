package com.hostel_ms.backend.controller;

import com.hostel_ms.backend.entity.Student;
import com.hostel_ms.backend.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {

    private final StudentService studentService;

    @Autowired
    public StudentController(StudentService studentService) {
        this.studentService = studentService;
    }

    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents() {
        return ResponseEntity.ok(studentService.getAllStudents());
    }

    @GetMapping("/{regNo}")
    public ResponseEntity<Student> getStudentById(@PathVariable String regNo) {
        return ResponseEntity.ok(studentService.getStudentById(regNo));
    }

    @PostMapping
    public ResponseEntity<Student> createStudent(@RequestBody Student student) {
        return new ResponseEntity<>(studentService.createStudent(student), HttpStatus.CREATED);
    }

    @PutMapping("/{regNo}")
    public ResponseEntity<Student> updateStudent(@PathVariable String regNo, @RequestBody Student studentDetails) {
        Student updated = studentService.updateStudent(regNo, studentDetails);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{regNo}")
    public ResponseEntity<Void> deleteStudent(@PathVariable String regNo) {
        studentService.deleteStudent(regNo);
        return ResponseEntity.noContent().build();

    }

}
