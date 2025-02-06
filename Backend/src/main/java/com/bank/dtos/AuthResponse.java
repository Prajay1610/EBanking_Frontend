package com.bank.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor

public class AuthResponse {
    private String token;
    private String status;

    public AuthResponse(String token) {
        this.token = token;
        status=  token!=null ? "success" : "error";
    
    }}
