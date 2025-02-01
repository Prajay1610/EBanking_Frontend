package com.bank.services;

import com.bank.dtos.ApiResponse;
import com.bank.dtos.BankReqDto;

public interface BankService {
	 ApiResponse addNewBank(BankReqDto bankDto);
}
