package com.bank.dtos;

import com.bank.entities.Gender;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor


public class BankManagerRespDto {

	
	//Manager Name	Bank Name	Email	Gender	Contact	Address
	private String BankManagerName;
	private String BankName;
	private String Email;
	private Gender gender;
	private String contactNo;
	private String Address;
	private Long managerId;
	



	
	
}
