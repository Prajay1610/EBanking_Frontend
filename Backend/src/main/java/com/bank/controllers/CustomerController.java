package com.bank.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.bank.dtos.ApiResponse;
import com.bank.dtos.TransactionResponseDto;
import com.bank.services.CustomerService;

@RestController
@RequestMapping("/customer")
@CrossOrigin("*")
public class CustomerController {
	@Autowired
	private CustomerService customerService;
	


	@GetMapping("/{customerId}/{accountId}")
	public ResponseEntity<?> getCustomerDetails(@PathVariable Long customerId,@PathVariable Long accountId){
		try {
			return ResponseEntity.status(HttpStatus.OK)
					.body(
							customerService.getCustomerDetails(customerId,accountId));
					
		} catch (RuntimeException e) {
			return ResponseEntity.
					status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body(new ApiResponse(e.getMessage()));
		}
	}
	
	@GetMapping("/transactions")
    public ResponseEntity<List<TransactionResponseDto>> getAllTransactions(
            @RequestParam(required = false) Long userId) {
        List<TransactionResponseDto> transactions = customerService.getAllTransactions(userId);
        return ResponseEntity.ok(transactions);
    }	
}
