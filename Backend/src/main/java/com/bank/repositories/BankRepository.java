package com.bank.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bank.dtos.BankDataResponseDto;
import com.bank.entities.Bank;

public interface BankRepository extends JpaRepository<Bank, Long>{

	@Query(value = "SELECT b.bank_name, COUNT(*) " +
            "FROM banks b JOIN bank_accounts c ON b.id = c.bank_id " +
            "GROUP BY b.bank_name", nativeQuery = true)
	List<BankDataResponseDto> getBankData();

}
