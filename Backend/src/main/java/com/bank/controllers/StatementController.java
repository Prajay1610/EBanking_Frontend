package com.bank.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bank.dtos.ApiResponse;
import com.bank.dtos.StatementReqDto;
import com.bank.entities.Statement;
import com.bank.services.StatementService;


@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/statement")
public class StatementController {
	
	@Autowired
	private StatementService statementService;
	
	@PostMapping
	public ResponseEntity<?> logStatementRecord(@RequestBody StatementReqDto statement){
		try {
			return ResponseEntity.status(HttpStatus.CREATED).body(statementService.saveStatementRecord(statement));
		} catch (RuntimeException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ApiResponse(e.getMessage()));
		}
	}
}
