package com.bank.dtos;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AuthRequest {
	@NotBlank(message = "Email must be not null and not blank!!!!")
	@Email(message = "Invalid email format")
	private String email;
	
//	@Pattern(regexp = "((?=.\\d)(?=.[a-z])(?=.[#@$]).{5,20})", message = "Invalid Password format!!!!")
	private String password;
}
