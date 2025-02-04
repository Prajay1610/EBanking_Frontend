package com.bank.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank.dtos.TransferMoneyDto;
import com.bank.services.TransferService;
@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/transfer")
public class TransferController {
	
	@Autowired
	private TransferService transferService;
	
	@PostMapping
	public ResponseEntity<?> transferMoney(@RequestBody TransferMoneyDto transferMoneyDto)
	{
		return transferService.transferMoney(transferMoneyDto.getFromAcccountNo(), transferMoneyDto.getToAcccountNo(), transferMoneyDto.getAmount(), transferMoneyDto.getDescription(), transferMoneyDto.getDescription());
	}
	
}
