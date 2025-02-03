package com.bank.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank.dtos.ApiResponse;
import com.bank.services.AdminService;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/Admin")
public class AdminController {
	@Autowired
	private AdminService adminService;
	
	
	@GetMapping("/allBankManager")
	public ResponseEntity<?> viewAllBankCustomers
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

}
