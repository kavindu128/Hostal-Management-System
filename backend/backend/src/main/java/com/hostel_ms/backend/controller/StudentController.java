package com.hostel_ms.backend.controller;

import com.hostel_ms.backend.dto.StudentDto;
import com.hostel_ms.backend.service.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@AllArgsConstructor
@RestController
@RequestMapping("/api/student")
public class StudentController {
    private StudentService studentService;

    @PostMapping
    public ResponseEntity<StudentDto> createStudent(@RequestBody StudentDto studentDto){
        StudentDto savedStudent = studentService.createStudent(studentDto);
        return new ResponseEntity<>(savedStudent, HttpStatus.CREATED);
    }

    @GetMapping("{regNo}")
    public ResponseEntity<StudentDto> getStudentByRegNo(@PathVariable("regNo") String regNo){
        StudentDto studentDto = studentService.getStudentByRegName(regNo);
        return ResponseEntity.ok(studentDto);
    }


    @GetMapping
    public ResponseEntity<List<StudentDto>> getAllStudents(){
        List<StudentDto> students = studentService.getAllStudent();
        return ResponseEntity.ok(students);
    }


    @PutMapping("{id}")
    public ResponseEntity<StudentDto> updateStudent(@PathVariable("id") String regNo,
                                                    @RequestBody StudentDto updatedStudent){
        StudentDto studentDto = studentService.updateStudent(regNo, updatedStudent);
        return ResponseEntity.ok(studentDto);
    }


    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable("id") String regNo){
        studentService.deleteStudent(regNo);
        return ResponseEntity.ok("Student deleted successfully!.");
    }

}
