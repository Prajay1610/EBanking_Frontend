package com.bank.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import com.bank.entities.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank.dtos.ApiResponse;
import com.bank.dtos.LoginRequest;
import com.bank.services.UserService;




@RestController
@RequestMapping("/api/auth")
public class AuthController {
	
	@Autowired
	private UserService userservice;
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest request)
	{
		User user=userservice.authenticate(request.getEmail(),request.getPassword());
		if(user!=null)
		{
			return ResponseEntity.ok(user);
		}else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse("Invalid credentials"));
		}
	}
	
	
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody User user)
	{
		return ResponseEntity.status(HttpStatus.CREATED).body(userservice.registerUser(user));
	}
	
	
}
