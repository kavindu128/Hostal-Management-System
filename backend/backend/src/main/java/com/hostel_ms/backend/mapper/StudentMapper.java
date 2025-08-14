package com.hostel_ms.backend.mapper;

import com.hostel_ms.backend.dto.StudentDto;
import com.hostel_ms.backend.entity.Student;

public class StudentMapper {

 public static StudentDto mapToStudentDto(Student student){
     return new StudentDto(
             student.getRegNo(),
             student.getFullName(),
             student.getDateOfBirth(),
             student.getAddressLine1(),
             student.getAddressLine2(),
             student.getCity(),
             student.getEmergencyContactName(),
             student.getEmergencyContactNo()
     );

 }

 public static Student mapToStudent(StudentDto studentDto){
     return new Student(
             studentDto.getRegNo(),
             studentDto.getFullName(),
             studentDto.getDateOfBirth(),
             studentDto.getAddressLine1(),
             studentDto.getAddressLine2(),
             studentDto.getCity(),
             studentDto.getEmergencyContactName(),
             studentDto.getEmergencyContactNo()
     );
 }


}
