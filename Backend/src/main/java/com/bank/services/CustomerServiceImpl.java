package com.bank.services;

import java.math.BigDecimal;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.dtos.CustomerProfileRespDto;
import com.bank.entities.AccountType;
import com.bank.entities.BankAccount;
import com.bank.entities.Customer;
import com.bank.entities.Gender;
import com.bank.repositories.BankAccountRepository;
import com.bank.repositories.CustomerRepository;

import jakarta.transaction.Transactional;

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

/*private String name;
	private String email;
	private AccountType accountType;
	private BigDecimal accountBalance;
	private Gender gender;
	private String contactNo;
	private String Address;
	*/
		
		//get account type for a customer's account
		return new CustomerProfileRespDto(customerName,email,accountType,balance,gender,PhoneNo,Address);
	}

}
