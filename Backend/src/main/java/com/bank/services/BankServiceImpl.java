package com.bank.services;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.dtos.ApiResponse;
import com.bank.dtos.BankReqDto;
import com.bank.entities.Bank;
import com.bank.repositories.BankRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class BankServiceImpl implements BankService{
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private BankRepository bankRepository;

	@Override
	public ApiResponse addNewBank(BankReqDto bankDto) {
		Bank transientBank = modelMapper.map(bankDto, Bank.class);
		Bank persistentBank = bankRepository.save(transientBank);
		
		
		return new ApiResponse("Bank Added successfully with ID: " 
				+ persistentBank.getId());
	}

}
