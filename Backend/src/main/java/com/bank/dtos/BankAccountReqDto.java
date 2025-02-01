package com.bank.dtos;

import java.math.BigDecimal;

import com.bank.entities.AccountType;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
public class BankAccountReqDto {
	
	    private Long customerId;

	    private Long bankId;
	   
	    private AccountType accountType;
	    
}
