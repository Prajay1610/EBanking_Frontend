package com.bank.dtos;


import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
public class BaseDto {
	
	private Long id;
	
	private LocalDateTime createdOn;
	
	private LocalDateTime updatedOn;
}
