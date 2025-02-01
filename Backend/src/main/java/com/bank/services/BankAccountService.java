package com.bank.services;

import com.bank.dtos.ApiResponse;
import com.bank.dtos.BankAccountReqDto;

public interface BankAccountService {
	ApiResponse addNewBankAccount(BankAccountReqDto bankaccdto);
}
