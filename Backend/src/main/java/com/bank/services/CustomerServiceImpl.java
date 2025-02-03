package com.bank.services;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.bank.entities.AccountType;
import com.bank.entities.BankAccount;
import com.bank.entities.Customer;
import com.bank.entities.Gender;
import com.bank.entities.Transaction;
import com.bank.entities.TransactionType;
import com.bank.repositories.BankAccountRepository;
import com.bank.repositories.CustomerRepository;
import com.bank.repositories.TransactionRepository;

import jakarta.transaction.Transactional;
import com.bank.dtos.*;

@Service
@Transactional
public class CustomerServiceImpl implements CustomerService{
	
	@Autowired
	private CustomerRepository customerRepository;
	
	@Autowired
	private BankAccountRepository bankAccountRepository;
	
	@Override
	public CustomerProfileRespDto getCustomerDetails(Long customerId,Long accountId) {
		Optional<Customer> cust = customerRepository.findById(customerId);
		
		Customer customer = cust.get();
		String customerName = customer.getUser().getFname()+" "+customer.getUser().getLname();
		String email = customer.getUser().getEmail();
		
		Optional<BankAccount> account = bankAccountRepository.findById(accountId);
		BankAccount bankAccount = account.get();
		AccountType accountType = bankAccount.getAccountType();
		BigDecimal balance = bankAccount.getBalance();
		String PhoneNo = customer.getUser().getPhoneNo();
		Gender gender = customer.getUser().getGender();
		String Address = customer.getUser().getAddress();
		//get account type for a customer's account
		return new CustomerProfileRespDto(customerName,email,accountType,balance,gender,PhoneNo,Address);
	}

	@Autowired
    private TransactionRepository transactionRepository;

	public List<TransactionResponseDto> getAllTransactions(Long userId) {
	    return transactionRepository.findAllByAccountId(userId)
	            .stream()
	            .map(this::convertToDto) // Convert each entity to DTO
	            .collect(Collectors.toList());
	}
    
    private TransactionResponseDto convertToDto(Transaction transaction) {
        TransactionResponseDto dto = new TransactionResponseDto();
        dto.setTransactionId(transaction.getId().toString());
        dto.setBank(new BankDto(transaction.getAccount().getBank().getBankName()));
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
