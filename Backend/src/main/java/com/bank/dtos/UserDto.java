package com.bank.dtos;

public class UserDto {

    private String name;

    // Constructor
    public UserDto(String name) {
        this.name = name;
    }

    // Getters and Setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}