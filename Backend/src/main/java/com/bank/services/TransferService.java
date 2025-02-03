package com.bank.services;

import java.math.BigDecimal;

import org.springframework.http.ResponseEntity;

import com.bank.entities.TransferDetail;


public interface TransferService {
	public ResponseEntity<?> transferMoney(Long fromAccountId, Long toAccountId, BigDecimal amount, String Description, String Ifsc);
}
