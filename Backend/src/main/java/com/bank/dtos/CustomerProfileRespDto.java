package com.bank.dtos;



import java.math.BigDecimal;

import com.bank.entities.AccountType;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor 
@AllArgsConstructor
public class CustomerProfileRespDto {
	private String name;
	private String email;
	private AccountType accountType;
	private BigDecimal accountBalance;
//	private List<Transaction> lastThreeTransactions;
	
	
}
