package com.bank.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank.dtos.ApiResponse;
import com.bank.dtos.BankAccountReqDto;
import com.bank.entities.BankAccount;
import com.bank.services.BankAccountService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/bankAccount")
public class BankAccountController {
	
	@Autowired
	private BankAccountService bankAccountService;
	
	@PostMapping
	public ResponseEntity<?> addNewBankAccount
	(@RequestBody BankAccountReqDto
			dto) {
		
		try {
			return ResponseEntity.status(HttpStatus.CREATED)
					.body(bankAccountService
							.addNewBankAccount(dto));
					
		} catch (RuntimeException e) {
			return ResponseEntity.
					status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ApiResponse(e.getMessage()));
		}
	}
	
	@GetMapping("/all/{managerId}")
	public ResponseEntity<?> viewAllBankAccounts(@PathVariable Long managerId){
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(bankAccountService.viewAllBankAccounts(managerId));
					
		} catch (RuntimeException e) {
			return ResponseEntity.
					status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ApiResponse(e.getMessage()));
		}
	}
	
	@GetMapping("/{accountId}")
	public ResponseEntity<?> viewSpecificBankAccount(@PathVariable Long accountId){
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(bankAccountService.viewSpecificBankAccount(accountId));
					
		} catch (RuntimeException e) {
			return ResponseEntity.
					status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ApiResponse(e.getMessage()));
		}
	}
	@PutMapping("/lockAccount/{accountId}")
	public  ResponseEntity<?> lockAccount(@PathVariable Long accountId) {
		//TODO: process POST request
		
		try {
			return ResponseEntity.status(HttpStatus.CREATED)
					.body(bankAccountService
							.lockAccount(accountId));
					
		} catch (RuntimeException e) {
			return ResponseEntity.
					status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ApiResponse(e.getMessage()));
		}
	}
	
	
	@PutMapping("/unlockAccount/{accountId}")
	public  ResponseEntity<?> unlockAccount(@PathVariable Long accountId) {
		//TODO: process POST request
		
		try {
			return ResponseEntity.status(HttpStatus.CREATED)
					.body(bankAccountService
							.unlockAccount(accountId));
					
		} catch (RuntimeException e) {
			return ResponseEntity.
					status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ApiResponse(e.getMessage()));
		}
	}
}
