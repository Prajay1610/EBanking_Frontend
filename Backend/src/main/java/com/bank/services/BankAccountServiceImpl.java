package com.bank.services;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.dtos.ApiResponse;
import com.bank.dtos.BankAccountReqDto;
import com.bank.entities.Bank;
import com.bank.entities.BankAccount;
import com.bank.entities.Customer;
import com.bank.repositories.BankAccountRespository;
import com.bank.repositories.BankRepository;
import com.bank.repositories.CustomerRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class BankAccountServiceImpl implements BankAccountService{
	
	@Autowired
	private BankAccountRespository bankAccountRepository;
	
	@Autowired
	private CustomerRepository customerRepository;
	
	@Autowired
	private BankRepository bankRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	@Override
	public ApiResponse addNewBankAccount(BankAccountReqDto bankAccDto) {
		Optional<Customer> customer = customerRepository.findById(bankAccDto.getCustomerId());
		Optional<Bank> bank = bankRepository.findById(bankAccDto.getBankId());
		
		BankAccount bankAccount = new BankAccount();
		bankAccount.setCustomer(customer.get());
		bankAccount.setBank(bank.get());
		bankAccount.setAccountType(bankAccDto.getAccountType());
		
		BankAccount createdBankAccount=bankAccountRepository.save(bankAccount);
		
		return new ApiResponse("Bank Account created successfully with ID: " 
				+ createdBankAccount.getId());
	}

}
