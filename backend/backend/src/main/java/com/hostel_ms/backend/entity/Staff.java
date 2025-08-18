package com.hostel_ms.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table
@Entity
public class Staff {
    @Id
    private String regNo;

    private String name;
    private String position;
    private String contact;

    @OneToMany(mappedBy = "staff", cascade = CascadeType.ALL)
    private List<Room> managedRooms = new ArrayList<>();

    @OneToOne(mappedBy = "staff", cascade = CascadeType.ALL)
    private User user;
}
