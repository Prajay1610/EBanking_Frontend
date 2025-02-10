package com.bank.services;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.dtos.AllCustomersRespDto;
import com.bank.dtos.ApiResponse;
import com.bank.dtos.BankAccountDto;
import com.bank.dtos.BankDto;
import com.bank.dtos.BankReqDto;
import com.bank.dtos.TransactionResponseDto;
import com.bank.dtos.UserDto;
import com.bank.entities.AccountType;
import com.bank.entities.Bank;
import com.bank.entities.BankAccount;
import com.bank.entities.BankManager;
import com.bank.entities.Customer;
import com.bank.entities.Gender;
import com.bank.entities.Role;
import com.bank.entities.Transaction;
import com.bank.entities.TransactionType;
import com.bank.entities.User;
import com.bank.exception.ResourceNotFoundException;
import com.bank.repositories.BankAccountRepository;
import com.bank.repositories.BankManagerRepository;
import com.bank.repositories.BankRepository;
import com.bank.repositories.CustomerRepository;
import com.bank.repositories.TransactionRepository;
import com.bank.repositories.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class BankServiceImpl implements BankService{
	
//	@Autowired
//	private ModelMapper modelMapper;
	
	@Autowired
	private BankRepository bankRepository;
	
	@Autowired
	private UserRepository userRepository;
	@Autowired
	private TransactionRepository transactionRepository;
	@Autowired
	private CustomerRepository customerRepository;
	@Autowired
	private BankManagerRepository bankManagerRepository;
	
	@Autowired
	private BankAccountRepository bankAccountRepository;

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
	User user = userRepository.findById(bankDto.getBankManagerId()).orElseThrow(()->new ResourceNotFoundException("Bank manager not found with id : "+bankDto.getBankManagerId()));
	
	BankManager bankManager = new BankManager();
	bankManager.setBank(persistentBank);
	bankManager.setUser(user);
	
	bankManagerRepository.save(bankManager);

	return new ApiResponse("Bank Added successfully with ID: " 
					+ persistentBank.getId());
	}

	@Override
	public List<AllCustomersRespDto> viewAllBankCustomers(Long bankManagerId) {
		Optional<BankManager> bankManager = bankManagerRepository.findById(bankManagerId);
		Long bankId = bankManager.get().getBank().getId();
		
		List<BankAccount> allBankAccounts = bankAccountRepository.findByBankId(bankId); 
		
		List<AllCustomersRespDto> allCustomersRespDto = new ArrayList<>();
		
		return allBankAccounts.stream().map(acc->new AllCustomersRespDto(acc.getCustomer().getUser().getFname()+" "+acc.getCustomer().getUser().getLname(), acc.getBank().getBankName(),acc.getCustomer().getUser().getEmail(),acc.getCustomer().getUser().getGender(),acc.getCustomer().getUser().getPhoneNo(),acc.getCustomer().getUser().getAddress(),acc.getId(),acc.getCustomer().getUser().getIsActive(),acc.getCustomer().getUser().getId(),acc.getCustomer().getId())).distinct().toList();
		
		
	}
	@Override
	public ApiResponse makeInActive(Long userId) {
		// TODO Auto-generated method stub
		User user=userRepository.findById(userId).orElseThrow(()->new ResourceNotFoundException("user id not found with id : "+ userId));;
	  Customer customerOptional = customerRepository.findByUserId(userId).orElseThrow(()->new ResourceNotFoundException(" user not found with id : "+userId));
	    

		if(user.getRole()==Role.CUSTOMER) {
			user.setIsActive(false);
		}
		
		List<BankAccount> bankAccounts = bankAccountRepository.findByCustomerId(customerOptional.getId());
		System.out.println(bankAccounts);

	    if (!bankAccounts.isEmpty()) {
	        for (BankAccount account : bankAccounts) {
	            account.setIsLocked(true); // Lock each bank account
	        }
	        bankAccountRepository.saveAll(bankAccounts); // Save all updated accounts
	    }
		userRepository.save(user);
		
		return new ApiResponse("Status updated to inactive: ");
	}

	@Override
	public ApiResponse makeActive(Long userId) {
		// TODO Auto-generated method stub
		User user=userRepository.findById(userId).orElseThrow(()->new ResourceNotFoundException("user id not found with id : "+ userId));
		Customer customerOptional = customerRepository.findByUserId(userId).orElseThrow(()->new ResourceNotFoundException("user id not found with id : "+ userId));
		if(user.getRole()==Role.CUSTOMER) {
			user.setIsActive(true);
		}
		List<BankAccount> bankAccounts = bankAccountRepository.findByCustomerId(customerOptional.getId());
	    if (!bankAccounts.isEmpty()) {
	        for (BankAccount account : bankAccounts) {
	            account.setIsLocked(false); // Lock each bank account
	        }
	        bankAccountRepository.saveAll(bankAccounts); // Save all updated accounts
	    }
		userRepository.save(user);		
		return new ApiResponse("Status updated to active: ");
	}

	@Override
	public List<TransactionResponseDto> getAllTransactionsForBank(Long managerId) {
	    // Retrieve the bank manager
	    BankManager bankManager = bankManagerRepository.findById(managerId).orElseThrow(()->new ResourceNotFoundException("manager id not found with id : "+ managerId));
	    
	    
	    // Get bank ID from the manager
	    Long bankId = bankManager.getBank().getId();

	    // Fetch all accounts associated with the bank
	    List<BankAccount> allBankAccounts = bankAccountRepository.findByBankId(bankId);
	    
	    // If no bank accounts are found, return an empty list
	    if (allBankAccounts.isEmpty()) {
	        return Collections.emptyList();
	    }
	    
	    // Fetch transactions for all bank accounts
	    List<Transaction> allTransactions = transactionRepository.findByAccountIn(allBankAccounts);
	    
	    // Convert transactions to DTOs
	    return allTransactions.stream()
	            .map(this::convertToDto)
	            .collect(Collectors.toList());
	}

	  private TransactionResponseDto convertToDto(Transaction transaction) {
	        TransactionResponseDto dto = new TransactionResponseDto();
	        dto.setTransactionId(transaction.getId().toString());
	        dto.setBank(new BankDto(transaction.getAccount().getBank().getBankName()));
	        
	        dto.setDestinationBank(transaction.getTransactionType() == TransactionType.TRANSFER 
	                ? new BankDto(transaction.getTransfer().getToAccount().getBank().getBankName()):null);
	        
	        dto.setUser(new UserDto(transaction.getAccount().getCustomer().getUser().getFname()));
	        dto.setBankAccount(new BankAccountDto(transaction.getAccount().getId()));
	        dto.setType(transaction.getTransactionType().name());
	        dto.setAmount(transaction.getAmount().doubleValue());
	        dto.setDestinationBankAccount(
	                transaction.getTransactionType() == TransactionType.TRANSFER 
	                        ? new BankAccountDto(transaction.getTransfer().getToAccount().getId())
	                        : null
	        );
	        dto.setNarration(transaction.getDescription());
	        dto.setTransactionTime(transaction.getCreatedOn().atZone(java.time.ZoneOffset.UTC).toInstant().toEpochMilli());
	        return dto;
	    }

		

}
