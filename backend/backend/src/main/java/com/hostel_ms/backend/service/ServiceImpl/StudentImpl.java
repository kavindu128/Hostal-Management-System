package com.hostel_ms.backend.service.ServiceImpl;

import com.hostel_ms.backend.entity.Student;
import com.hostel_ms.backend.exception.ResourceNotFoundException;
import com.hostel_ms.backend.repository.StudentRepository;
import com.hostel_ms.backend.service.StudentService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class StudentImpl implements StudentService {

    private final StudentRepository studentRepository;

    @Autowired
    public StudentImpl(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    @Override
    public Student getStudentById(String regNo) {
        return studentRepository.findById(regNo). orElseThrow(()-> new ResourceNotFoundException("Student not found with regNo"+ regNo));
    }

    @Override
    public Student createStudent(Student student) {
        return studentRepository.save(student);
    }

    @Override
    public Student updateStudent(String regNo, Student studentDetails) {
        Student student = getStudentById(regNo);
        student.setFullName(studentDetails.getFullName());
        student.setDateOfBirth(studentDetails.getDateOfBirth());
        student.setAddressLine1(studentDetails.getAddressLine1());
        student.setAddressLine2(studentDetails.getAddressLine2());
        student.setCity(studentDetails.getCity());
        student.setEmergencyContactName(studentDetails.getEmergencyContactName());
        student.setEmergencyContactNo(studentDetails.getEmergencyContactNo());

        return studentRepository.save(student);
    }

    @Override
    public void deleteStudent(String regNo) {
        Student student = getStudentById(regNo);
        studentRepository.delete(student);

    }
}
