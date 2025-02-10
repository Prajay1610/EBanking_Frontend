package com.bank.dtos;

import java.time.LocalDate;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)
public class StatementReqDto extends BaseDto{
	
	 private Long accountId;
	
	 private LocalDate startDate;
	 
	 private LocalDate endDate;
}
