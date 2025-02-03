package com.bank.dtos;

import com.bank.entities.Gender;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//for bank_manager to view all customers belonging to that bank.

@Getter
@Setter
@NoArgsConstructor
public class AllCustomersRespDto {
	private String customerName;
	private String bankName;
	private String customerEmail;
	private Gender gender;
	private String customerContact;
	private String customerAddress;
	private Long accountId;
	private boolean customerStatus;
	public AllCustomersRespDto(String customerName, String bankName, String customerEmail, Gender gender,
			String customerContact, String customerAddress, Long accountId, boolean customerStatus) {
		super();
		this.customerName = customerName;
		this.bankName = bankName;
		this.customerEmail = customerEmail;
		this.gender = gender;
		this.customerContact = customerContact;
		this.customerAddress = customerAddress;
		this.accountId = accountId;
		this.customerStatus = customerStatus;
	}
	
}
