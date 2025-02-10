package com.bank.dtos;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class BankDataResponseDto {
	String bankName;
	Long customerCount;
}
