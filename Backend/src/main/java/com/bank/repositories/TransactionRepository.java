package com.bank.repositories;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.bank.entities.BankAccount;
import com.bank.entities.Transaction;

@Repository
public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    List<Transaction> findAllByAccountId(Long accountId);
    List<Transaction> findByAccountIn(List<BankAccount> accounts);
	
   
    @Query("SELECT t FROM Transaction t " +
    	       "WHERE t.account = :account " +
    	       "AND t.createdOn <= :date " +  // Find transactions on or before the given date
    	       "ORDER BY t.createdOn DESC LIMIT 1")
    	Optional<Transaction> findLastTransactionBeforeOrOn(@Param("account") BankAccount account, 
    	                                                    @Param("date") LocalDateTime date);

    	@Query("SELECT t FROM Transaction t " +
    	       "WHERE t.account = :account " +
    	       "AND DATE(t.createdOn) = :createdOn " +
    	       "ORDER BY t.createdOn ASC LIMIT 1")
    	Optional<Transaction> findFirstTransaction(@Param("account") BankAccount account, 
    	                                           @Param("createdOn") LocalDate createdOn);

    	@Query("SELECT t FROM Transaction t " +
    	       "WHERE t.account = :account " +
    	       "AND DATE(t.createdOn) = :createdOn " +
    	       "ORDER BY t.createdOn DESC LIMIT 1")
    	Optional<Transaction> findLastTransaction(@Param("account") BankAccount account, 
    	                                          @Param("createdOn") LocalDate createdOn);


    
    
}