package com.bank.dtos;



import java.math.BigDecimal;

import com.bank.entities.AccountType;
import com.bank.entities.Gender;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor 
public class CustomerProfileRespDto {
	private String name;
	private String email;
	private AccountType accountType;
	private BigDecimal accountBalance;
	private Gender gender;
	private String contactNo;
	private String Address;
	public CustomerProfileRespDto(String name, String email, AccountType accountType, BigDecimal accountBalance,
			Gender gender, String contactNo, String address) {
		super();
		this.name = name;
		this.email = email;
		this.accountType = accountType;
		this.accountBalance = accountBalance;
		this.gender = gender;
		this.contactNo = contactNo;
		Address = address;
	}
	
//	private List<Transaction> lastThreeTransactions;
	
	
}
