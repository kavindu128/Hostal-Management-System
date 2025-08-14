package com.hostel_ms.backend.service.impl;

import com.hostel_ms.backend.dto.StudentDto;
import com.hostel_ms.backend.entity.Student;
import com.hostel_ms.backend.exception.ResourceNotFoundException;
import com.hostel_ms.backend.mapper.StudentMapper;
import com.hostel_ms.backend.repository.StudentRepository;
import com.hostel_ms.backend.service.StudentService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public  class StudentServiceImpl implements StudentService {

    private StudentRepository studentRepository ;

    @Override
    public StudentDto createStudent(StudentDto studentDto) {
        Student student = StudentMapper.mapToStudent(studentDto);
        Student saveStudent = studentRepository.save(student);
        return StudentMapper.mapToStudentDto(saveStudent);
    }

    @Override
    public StudentDto getStudentByRegName(String regNo) {
        Student student = studentRepository.findById(regNo).orElseThrow(()-> new ResourceNotFoundException("Student is not exist with given id :" + regNo));
        return StudentMapper.mapToStudentDto(student);
    }

    @Override
    public List<StudentDto> getAllStudent() {
        List<Student> students = studentRepository.findAll();
        return students.stream().map((student)-> StudentMapper.mapToStudentDto(student))
                .collect(Collectors.toList());
    }

    @Override
    public StudentDto updateStudent(String regNo, StudentDto updatedStudent) {
        Student student = studentRepository.findById(regNo).orElseThrow(()->
                new ResourceNotFoundException("Student is not exists with given id:"+ regNo)
        );

        student.setFullName(updatedStudent.getFullName());
        student.setDateOfBirth(updatedStudent.getDateOfBirth());
        student.setAddressLine1(updatedStudent.getAddressLine1());
        student.setAddressLine2(updatedStudent.getAddressLine2());
        student.setCity(updatedStudent.getCity());
        student.setEmergencyContactName(updatedStudent.getEmergencyContactName());
        student.setEmergencyContactNo(updatedStudent.getEmergencyContactNo());

        Student updatedStudentObj = studentRepository.save(student);
        return StudentMapper.mapToStudentDto(updatedStudentObj);
    }

    @Override
    public void deleteStudent(String regNo) {
        Student student = studentRepository.findById(regNo).orElseThrow(()->
                new ResourceNotFoundException("Student is not exists with given id:"+ regNo)
        );

        studentRepository.deleteById(regNo);

    }
}
