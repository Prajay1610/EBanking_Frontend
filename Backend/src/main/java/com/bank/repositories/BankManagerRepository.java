package com.bank.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.bank.entities.BankManager;

public interface BankManagerRepository extends JpaRepository<BankManager, Long>{
	 @Query("SELECT bm.user.id FROM BankManager bm")
	List<Long> findAllUserIds();

	BankManager findByUserId(Long userId);
	
}
