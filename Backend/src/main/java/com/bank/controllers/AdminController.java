package com.bank.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank.dtos.ApiResponse;
import com.bank.services.AdminService;

@CrossOrigin(origins ="http://localhost:3000")
@RestController
@RequestMapping("/admin")
public class AdminController {
	@Autowired
	private AdminService adminService;
	
	
	@GetMapping("/allBankManager")
	public ResponseEntity<?> viewAllBankManagers
	() {
		
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(adminService.viewAllBankManager());
					
		} catch (RuntimeException e) {
			return ResponseEntity.
					status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ApiResponse(e.getMessage()));
		}
	}
	
	@GetMapping("/allBanks")
	public ResponseEntity<?> ViewBanks(){
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(adminService.viewAllBanks());
					
		} catch (RuntimeException e) {
			return ResponseEntity.
					status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ApiResponse(e.getMessage()));
		}
	}
	
	@GetMapping("/getAllBankManagersFromUser")
	public ResponseEntity<?> getAllBankManagersFromUser
	() {
		
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(adminService.getAllBankManagersFromUser());
					
		} catch (RuntimeException e) {
			return ResponseEntity.
					status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ApiResponse(e.getMessage()));
		}
	}
	
	@PatchMapping("/toggleManagerStatus/{managerId}")
	public  ResponseEntity<?> makeInActive(@PathVariable Long managerId) {
		//TODO: process POST request
		
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(adminService
							.toggleManagerStatus(managerId));
					
		} catch (RuntimeException e) {
			return ResponseEntity.
					status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ApiResponse(e.getMessage()));
		}
	}
}
