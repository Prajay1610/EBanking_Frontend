package com.bank.entities;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Table(name = "BankAccounts")
@Setter
@NoArgsConstructor
@AllArgsConstructor
@SequenceGenerator(name = "account_seq", sequenceName = "account_seq", allocationSize = 1)
public class BankAccount extends BaseEntity {
    

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne
    @JoinColumn(name = "bank_id", nullable = false)
    private Bank bank;
    

    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(nullable = false, unique = true, name = "account_no")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false,name="account_type")
    private AccountType accountType;
    
    private BigDecimal balance=BigDecimal.ZERO;
    
    @Column(name = "is_locked")
    private Boolean isLocked=false;


    // Getters and Setters
}