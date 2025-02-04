package com.bank.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bank.entities.Customer;

public interface CustomerRepository extends JpaRepository<Customer, Long> {

	Optional<Customer> findByUserId(Long customerId);
	
}
