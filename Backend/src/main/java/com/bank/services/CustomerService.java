package com.bank.services;

import com.bank.dtos.CustomerProfileRespDto;

public interface CustomerService {
	 public CustomerProfileRespDto getCustomerDetails(Long customerId,Long accountId);
}
