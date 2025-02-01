package com.bank.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bank.entities.Bank;

public interface BankRepository extends JpaRepository<Bank, Long>{

}
