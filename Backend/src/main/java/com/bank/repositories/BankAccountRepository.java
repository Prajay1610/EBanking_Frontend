package com.bank.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bank.entities.BankAccount;

public interface BankAccountRepository extends JpaRepository<BankAccount, Long>{
	public List<BankAccount> findByBankId(Long bankId);
}
