package com.bank.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bank.entities.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long>{
	
}
