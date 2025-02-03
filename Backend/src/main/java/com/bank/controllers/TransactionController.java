package com.bank.controllers;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank.dtos.TransactionDto;
import com.bank.exception.InvalidAmountException;
import com.bank.services.TransactionService;

@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/transaction")
public class TransactionController {
	@Autowired
	private TransactionService transactionService;
	
	@PostMapping("/deposit")
	public ResponseEntity<?> depositMoney(@RequestBody TransactionDto trxDto ) 
	{
		if(trxDto.getAmount().compareTo(BigDecimal.ZERO)<0)
		{
			throw new InvalidAmountException("Invalid amount entered");
		}
		return transactionService.depositMoney(trxDto.getAccountNo(),trxDto.getAmount());
	
	}
	
	@PostMapping("/withdraw")
	public ResponseEntity<?> withdrawMoney(@RequestBody TransactionDto trxDto ) 
	{
		if(trxDto.getAmount().compareTo(BigDecimal.ZERO)<0)
		{
			throw new InvalidAmountException("Invalid amount entered");
		}
		return transactionService.withdrawMoney(trxDto.getAccountNo(),trxDto.getAmount());
	
	}
}
