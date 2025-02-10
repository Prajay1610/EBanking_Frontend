package com.bank.services;

import com.bank.dtos.ApiResponse;
import com.bank.dtos.StatementReqDto;

public interface StatementService {

	ApiResponse saveStatementRecord(StatementReqDto statement);
	
}
