package com.bank.dtos;

import java.time.LocalDateTime;

public class TransactionResponseDto {

    private String transactionId;
    private BankDto bank;
    private UserDto user;
    private BankAccountDto bankAccount;
    private String type; // e.g., "Withdrawal", "Deposit", "Transfer"
    private double amount;
    private BankAccountDto destinationBankAccount; // Can be null for withdrawals
    private String narration;
    private Long transactionTime; // Epoch time in milliseconds

    // Getters and Setters
    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public BankDto getBank() {
        return bank;
    }

    public void setBank(BankDto bank) {
        this.bank = bank;
    }

    public UserDto getUser() {
        return user;
    }

    public void setUser(UserDto user) {
        this.user = user;
    }

    public BankAccountDto getBankAccount() {
        return bankAccount;
    }

    public void setBankAccount(BankAccountDto bankAccount) {
        this.bankAccount = bankAccount;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public BankAccountDto getDestinationBankAccount() {
        return destinationBankAccount;
    }

    public void setDestinationBankAccount(BankAccountDto destinationBankAccount) {
        this.destinationBankAccount = destinationBankAccount;
    }

    public String getNarration() {
        return narration;
    }

    public void setNarration(String narration) {
        this.narration = narration;
    }

    public Long getTransactionTime() {
        return transactionTime;
    }

    public void setTransactionTime(Long transactionTime) {
        this.transactionTime = transactionTime;
    }
}