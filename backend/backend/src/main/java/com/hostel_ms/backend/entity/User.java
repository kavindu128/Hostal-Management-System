package com.hostel_ms.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table
@Entity
public class User {
    @Id
    private String username;

    private String password;
    private String role;

    @OneToOne
    @JoinColumn(name = "student_reg_no")
    private Student student;

    @OneToOne
    @JoinColumn(name = "staff_reg_no")
    private Staff staff;
}
