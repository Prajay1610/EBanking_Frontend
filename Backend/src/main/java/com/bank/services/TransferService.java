package com.bank.services;

import java.math.BigDecimal;

import com.bank.entities.TransferDetail;

public interface TransferService {
	public TransferDetail transferMoney(Long fromAccountId, Long toAccountId, BigDecimal amount);
}
