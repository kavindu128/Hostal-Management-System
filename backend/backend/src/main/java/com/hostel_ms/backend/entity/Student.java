package com.hostel_ms.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table
public class Student {

    @Id
    @Column(name = "reg_no" )
    private String regNo;

    @Column(name= "full_name")
    private String fullName;

    @Column(name="date")
    private Date dateOfBirth;

    @Column(name="address_line_1")
    private String addressLine1;

    @Column(name="address_line_2")
    private String addressLine2;

    @Column(name= "city")
    private String city;

    @Column(name= "emergency_contact_name")
    private String emergencyContactName;

    @Column(name= "emergency_contact_no")
    private String emergencyContactNo;


}
