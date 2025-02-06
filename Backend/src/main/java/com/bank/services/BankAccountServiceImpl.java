package com.bank.services;

import java.util.List;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.dtos.ApiResponse;
import com.bank.dtos.BankAccountReqDto;
import com.bank.dtos.BankAccountRespDto;
import com.bank.entities.Bank;
import com.bank.entities.BankAccount;
import com.bank.entities.BankManager;
import com.bank.entities.Customer;
import com.bank.exception.ResourceNotFoundException;
import com.bank.repositories.BankAccountRepository;
import com.bank.repositories.BankManagerRepository;
import com.bank.repositories.BankRepository;
import com.bank.repositories.CustomerRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class BankAccountServiceImpl implements BankAccountService{
	
	@Autowired
	private BankAccountRepository bankAccountRepository;
	
	@Autowired
	private CustomerRepository customerRepository;
	
	@Autowired
	private BankRepository bankRepository;
	
	@Autowired
	private BankManagerRepository bankManagerRepository;
	
	
	
	@Override
	public ApiResponse addNewBankAccount(BankAccountReqDto bankAccDto) {
		Customer customer = customerRepository.findById(bankAccDto.getCustomerId()).orElseThrow(()->new ResourceNotFoundException("Can't Find customer with id : "+bankAccDto.getCustomerId()));;
		Bank bank = bankRepository.findById(bankAccDto.getBankId()).orElseThrow(()->new ResourceNotFoundException("Can't Find bank with id : "+bankAccDto.getBankId()));
		
		BankAccount bankAccount = new BankAccount();
		bankAccount.setCustomer(customer);
		bankAccount.setBank(bank);
		bankAccount.setAccountType(bankAccDto.getAccountType());
		
		BankAccount createdBankAccount=bankAccountRepository.save(bankAccount);
		
		return new ApiResponse("Bank Account created successfully with ID: " 
				+ createdBankAccount.getId());
	}
	@Override
	public List<BankAccountRespDto> viewAllBankAccounts(Long managerId) {
		BankManager bankManager = bankManagerRepository.findById(managerId).orElseThrow(()->new ResourceNotFoundException("Can't Find manager with id: "+managerId));
		
		Bank associatedBank = bankManager.getBank();
		
		List<BankAccount> allBankAccounts = bankAccountRepository.findByBankId(associatedBank.getId());
		
		
		
		return allBankAccounts.stream().map(acc -> 
        new BankAccountRespDto(
            acc.getCustomer().getUser().getFname() + " " + acc.getCustomer().getUser().getLname(), // Customer Name
            acc.getBank().getBankName(), 
            acc.getId(), 
            acc.getBank().getBankIfsc(), 
            acc.getAccountType().name(), 
            acc.getIsLocked() ? "LOCKED" : "ACTIVE", 
            acc.getCustomer().getUser().getEmail(),
            acc.getCreatedOn()
        )
    ).toList();

	}
	@Override
	public BankAccountRespDto viewSpecificBankAccount(Long accountId) {
		BankAccount bankAccount = bankAccountRepository.findById(accountId).orElseThrow(()->new ResourceNotFoundException("Can't bankAccount  with account number: "+accountId));
		
		BankAccount acc = bankAccount; 
		return  new BankAccountRespDto(
				acc.getCustomer().getUser().getFname() + " " + acc.getCustomer().getUser().getLname(), // Customer Name
	            acc.getBank().getBankName(), 
	            acc.getId(),
	            acc.getBank().getBankIfsc(), 
	            acc.getAccountType().name(),
	            acc.getIsLocked() ? "LOCKED" : "ACTIVE",
	            acc.getCustomer().getUser().getEmail(),
	            acc.getBalance(),	            
	            acc.getCreatedOn()
	        );
		
		
	}
	@Override
	public ApiResponse lockAccount(Long accountId) {
		// TODO Auto-generated method stub
		BankAccount bankAccount = bankAccountRepository.findById(accountId).orElseThrow(()->new ResourceNotFoundException("Bank manager not found with id : "+accountId));;
		bankAccount.setIsLocked(true);
		bankAccountRepository.save(bankAccount);
		
		return new ApiResponse("Account Locked  ");
	}
	@Override
	public ApiResponse unlockAccount(Long accountId) {
		// TODO Auto-generated method stub
		BankAccount bankAccount = bankAccountRepository.findById(accountId).orElseThrow(()->new ResourceNotFoundException("Bank manager not found with id : "+accountId));;
		bankAccount.setIsLocked(false);
		bankAccountRepository.save(bankAccount);
		
		return new ApiResponse("Account Unlocked  ");
	}

}
