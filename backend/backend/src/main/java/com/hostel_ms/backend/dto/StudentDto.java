package com.hostel_ms.backend.dto;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class StudentDto {
    private String regNo;
    private String fullName;
    private Date dateOfBirth;
    private String addressLine1;
    private String addressLine2;
    private String city;
    private String emergencyContactName;
    private String emergencyContactNo;
}
