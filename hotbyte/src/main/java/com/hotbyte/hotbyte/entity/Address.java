package com.hotbyte.hotbyte.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Getter;
import lombok.Setter;
import jakarta.validation.constraints.NotBlank;
@Entity
@Getter
@Setter
public class Address {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


@NotBlank
private String label;

@NotBlank
private String addressLine;

@NotBlank
private String city;

@NotBlank
private String pincode;


    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnore
    private User user;
    private boolean isSelected;


}