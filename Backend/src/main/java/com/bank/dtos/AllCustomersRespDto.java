package com.bank.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//for bank_manager to view all customers belonging to that bank.

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AllCustomersRespDto {
	private String customerName;
	private String bankName;
	private String customerEmail;
//	private String Gender;
//	private String customerContact;
//	private String customerAddress;
	private Long accountId;
	private boolean customerStatus;
}
