package com.bank.services;

import java.util.List;

import com.bank.dtos.ApiResponse;
import com.bank.dtos.BankAccountReqDto;
import com.bank.dtos.BankAccountRespDto;
import com.bank.entities.BankAccount;

public interface BankAccountService {
	ApiResponse addNewBankAccount(BankAccountReqDto bankaccdto);

	List<BankAccountRespDto> viewAllBankAccounts(Long managerId);

	BankAccountRespDto viewSpecificBankAccount(Long accountId);

	ApiResponse lockAccount(Long accountId);

	ApiResponse unlockAccount(Long accountId);
}
