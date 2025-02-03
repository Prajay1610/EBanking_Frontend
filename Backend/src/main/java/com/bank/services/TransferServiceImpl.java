package com.bank.services;

import java.math.BigDecimal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.bank.dtos.ApiResponse;
import com.bank.entities.BankAccount;
import com.bank.entities.Transaction;
import com.bank.entities.TransactionType;
import com.bank.entities.TransferDetail;
import com.bank.exception.InsufficientBalanceException;
import com.bank.exception.ResourceNotFoundException;
import com.bank.repositories.BankAccountRepository;
import com.bank.repositories.BankRepository;
import com.bank.repositories.TransactionRepository;
import com.bank.repositories.TransferRepository;

import jakarta.transaction.Transactional;


@Transactional
@Service
public class TransferServiceImpl  implements TransferService{

	@Autowired
	private TransferRepository transferRepository;
	
	@Autowired
	private BankAccountRepository bankAccRepository;
	
	@Autowired
	private TransactionRepository transactionRepository;
	
	@Override
	public ResponseEntity<?> transferMoney(Long fromAccountId, Long toAccountId, BigDecimal amount, String Description,
			String Ifsc) {
		BankAccount fromAccount = bankAccRepository.findById(fromAccountId).orElseThrow(()-> new ResourceNotFoundException("Account not found"));
		BankAccount toAccount = bankAccRepository.findById(toAccountId).orElseThrow(()-> new ResourceNotFoundException("Account not found"));
		
		BigDecimal existingBalanceFrom = fromAccount.getBalance();
		BigDecimal existingBalanceTo = toAccount.getBalance();
		
		if(existingBalanceFrom.compareTo(amount)<0)
		{
			throw new InsufficientBalanceException("Money transfer failed. Insufficient balance");
		}	
		
            // Deduct the amount from the sender's account
            fromAccount.setBalance(existingBalanceFrom.subtract(amount));

            // Add the amount to the recipient's account
            BigDecimal toAccountBalance = toAccount.getBalance();
            toAccount.setBalance(toAccountBalance.add(amount));

            
            BankAccount persistFromAcc= bankAccRepository.save(fromAccount);
            BankAccount persistToAcc= bankAccRepository.save(toAccount);
            
            

            
            Transaction debitTrx = new Transaction();
            debitTrx.setAccount(persistFromAcc);
    		
            debitTrx.setAmount(amount);
            debitTrx.setBalanceBeforeTrx(existingBalanceFrom);
            debitTrx.setBalanceAfterTrx(persistFromAcc.getBalance());
            debitTrx.setDescription("DEBIT");
            debitTrx.setTransactionType(TransactionType.WITHDRAWAL);
    		Transaction persistenDebitTrx=transactionRepository.save(debitTrx);
    		
    		
    		Transaction creditTrx = new Transaction();
    		creditTrx.setAccount(persistToAcc);
    		
            creditTrx.setAmount(amount);
            creditTrx.setBalanceBeforeTrx(existingBalanceTo);
            creditTrx.setBalanceAfterTrx(persistToAcc.getBalance());
            creditTrx.setDescription("CREDIT");
            creditTrx.setTransactionType(TransactionType.WITHDRAWAL);
    		Transaction persistenCreditTrx=transactionRepository.save(creditTrx);
    		
    		Transaction transferMoney= new Transaction();
    		transferMoney.setAccount(persistFromAcc);
    		
			transferMoney.setAmount(persistFromAcc.getBalance());
			transferMoney.setBalanceBeforeTrx(existingBalanceFrom);
			transferMoney.setBalanceAfterTrx(persistFromAcc.getBalance());
			transferMoney.setDescription(Description);
			transferMoney.setTransactionType(TransactionType.TRANSFER);	
			Transaction persistentTransferTrx=transactionRepository.save(transferMoney);
            
            TransferDetail transferDetail = new TransferDetail();
            transferDetail.setAmount(amount);
            transferDetail.setFromAccount(fromAccount);
            transferDetail.setToAccount(toAccount);
            TransferDetail persistenTransfer = transferRepository.save(transferDetail);
            
            return ResponseEntity.ok(new ApiResponse("Money tranfer successfull. Transferdetails id : "+persistenTransfer.getId()));

		
		
	}
	
}
