package com.hostel_ms.backend.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
public class Room {

    @Id
    private String roomNo;

    private String hostelName;
    private String floor;
    private int capacity;
    private String status;

    @OneToMany(mappedBy = "room", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Allocation> allocations = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name = "staff_id")
    private Staff staff;
}
