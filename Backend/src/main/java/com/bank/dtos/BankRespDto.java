package com.bank.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor 
@AllArgsConstructor
public class BankRespDto {
/*Bank Name	IFSC	Address	Phone No	Email	Website	Country*/
	private String BankName;
	private String IfscCode;
	private String Address;
	private String PhoneNo;
	private String email;
	private String website;
	private String country;
	
	
}
