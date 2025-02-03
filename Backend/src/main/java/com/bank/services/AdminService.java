package com.bank.services;

import java.util.List;

import com.bank.dtos.BankManagerRespDto;
import com.bank.dtos.BankRespDto;

public interface AdminService {

	List<BankManagerRespDto> viewAllBankManager();

	List<BankRespDto> viewAllBanks();

}
