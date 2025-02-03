package com.bank.dtos;

public class BankAccountDto {

    private Long number;

    // Constructor
    public BankAccountDto(Long long1) {
        this.number = long1;
    }

    // Getters and Setters
    public Long getNumber() {
        return number;
    }

    public void setNumber(Long number) {
        this.number = number;
    }
}