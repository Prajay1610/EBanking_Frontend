package com.bank.dtos;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
public class BankReqDto {
	 
	    private String bankName;

	   
	    private String phone;
	    
	    private String address;

	  
	    private String bankIfsc;

	    
	    private String bankWebsite;

	   
	    private String bankEmail;
	    
	   
	    private String bankCountry;
	    
	    //For bankManager Tagging
	    private Long bankManagerId;

}
