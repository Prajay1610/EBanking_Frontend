package com.bank.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank.dtos.ApiResponse;
import com.bank.dtos.BankAccountReqDto;
import com.bank.services.BankAccountService;

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
}
