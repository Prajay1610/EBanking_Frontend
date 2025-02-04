package com.bank.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank.dtos.ApiResponse;
import com.bank.dtos.BankReqDto;
import com.bank.services.BankService;


@RestController
@RequestMapping("/bank")
@CrossOrigin(origins="http://localhost:3000")
public class BankController {
	@Autowired
	private BankService bankService;
	
	@PostMapping("/add")
	public ResponseEntity<?> addNewBank
	(@RequestBody BankReqDto 
			dto) {
		
		try {
			return ResponseEntity.status(HttpStatus.CREATED)
					.body(bankService
							.addNewBank(dto));
					
		} catch (RuntimeException e) {
			return ResponseEntity.
					status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ApiResponse(e.getMessage()));
		}
	}
	
	@GetMapping("/allCustomers/{bankManagerId}")
	public ResponseEntity<?> viewAllBankCustomers
	(@PathVariable Long 
			bankManagerId) {
		
		try {
			return ResponseEntity.status(HttpStatus.CREATED)
					.body(bankService
							.viewAllBankCustomers(bankManagerId));
					
		} catch (RuntimeException e) {
			return ResponseEntity.
					status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ApiResponse(e.getMessage()));
		}
	}
}
