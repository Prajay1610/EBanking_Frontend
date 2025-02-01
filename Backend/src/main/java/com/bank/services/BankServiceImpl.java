package com.bank.services;

import java.io.Serializable;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.dtos.ApiResponse;
import com.bank.dtos.BankReqDto;
import com.bank.entities.Bank;
import com.bank.entities.BankManager;
import com.bank.entities.User;
import com.bank.repositories.BankManagerRepository;
import com.bank.repositories.BankRepository;
import com.bank.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class BankServiceImpl implements BankService{
	
	@Autowired
	private ModelMapper modelMapper;
	
	@Autowired
	private BankRepository bankRepository;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private BankManagerRepository bankManagerRepository;

	@Override
	public ApiResponse addNewBank(BankReqDto bankDto) {
	
	Bank bank = new Bank();
	bank.setBankName(bankDto.getBankName());
	bank.setAddress(bankDto.getAddress());
	bank.setBankCountry(bankDto.getBankCountry());
	bank.setBankEmail(bankDto.getBankEmail());
	bank.setBankIfsc(bankDto.getBankIfsc());
	bank.setBankWebsite(bankDto.getBankWebsite());
	bank.setPhone(bankDto.getPhone());
	
	
	//save bank account
	Bank persistentBank = bankRepository.save(bank);
	
	
	
	//fetching bank manager based on id
	Optional<User> user = userRepository.findById(bankDto.getBankManagerId());
	
	BankManager bankManager = new BankManager();
	bankManager.setBank(persistentBank);
	bankManager.setUser(user.get());
	
	bankManagerRepository.save(bankManager);

	return new ApiResponse("Bank Added successfully with ID: " 
					+ persistentBank.getId());
	}

}
