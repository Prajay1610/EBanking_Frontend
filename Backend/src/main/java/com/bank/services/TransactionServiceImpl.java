package com.bank.services;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.bank.dtos.ApiResponse;
import com.bank.entities.BankAccount;
import com.bank.entities.Transaction;
import com.bank.entities.TransactionType;
import com.bank.exception.InsufficientBalanceException;
import com.bank.exception.ResourceNotFoundException;
import com.bank.repositories.BankAccountRepository;
import com.bank.repositories.TransactionRepository;

import jakarta.transaction.Transactional;


@Service
@Transactional
public class TransactionServiceImpl implements TransactionService {
	
	@Autowired
	private  TransactionRepository transactionRepository;
	
	@Autowired
	private BankAccountRepository bankAccountRepository;
	
	@Override
	public ResponseEntity<?> depositMoney(Long accountNo, BigDecimal amount) {
		BankAccount bankAc = bankAccountRepository.findById(accountNo).orElseThrow(()->new ResourceNotFoundException("Invalid account no : "+accountNo));
		BigDecimal existingBalance = bankAc.getBalance();
		bankAc.setBalance(existingBalance.add(amount));
		BankAccount persistentBankAc = bankAccountRepository.save(bankAc);
		
		Transaction trx =  new Transaction();
		trx.setAccount(bankAc);
		trx.setBalanceBeforeTrx(existingBalance);
		trx.setBalanceAfterTrx(persistentBankAc.getBalance());
		trx.setAmount(amount);
		trx.setDescription("DEPOSIT");
		trx.setTransactionType(TransactionType.DEPOSIT);
		Transaction persistenTrx=transactionRepository.save(trx);
		
		return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("Money Deposited . Transaction Id : "+persistenTrx.getId()));
		
		
	}

	@Override
	public ResponseEntity<?> withdrawMoney(Long accountNo, BigDecimal amount) {
		BankAccount bankAc = bankAccountRepository.findById(accountNo).orElseThrow(()->new ResourceNotFoundException("Invalid account no : "+accountNo));
		BigDecimal existingBalance = bankAc.getBalance();
		
		if(existingBalance.compareTo(amount)<0)
		{
			throw new InsufficientBalanceException("Insufficient balance");
		}
		
		bankAc.setBalance(existingBalance.subtract(amount));
		BankAccount persistentBankAc = bankAccountRepository.save(bankAc);
		
		Transaction trx =  new Transaction();
		trx.setAccount(bankAc);
		
		trx.setAmount(persistentBankAc.getBalance());
		trx.setBalanceBeforeTrx(existingBalance);
		trx.setBalanceAfterTrx(persistentBankAc.getBalance());
		trx.setDescription("WITHDRAW");
		trx.setTransactionType(TransactionType.WITHDRAWAL);
		Transaction persistenTrx=transactionRepository.save(trx);
		
		return ResponseEntity.status(HttpStatus.OK).body(new ApiResponse("Money withdraw successfull . Remaining balance : " +persistenTrx.getAmount() +" Transaction Id : "+persistenTrx.getId()));
	}

}
