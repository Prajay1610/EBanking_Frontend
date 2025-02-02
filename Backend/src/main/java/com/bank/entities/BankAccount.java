package com.bank.entities;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import jakarta.persistence.*;
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
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)  // Use IDENTITY for MySQL
    @Column(nullable = false, unique = true, name = "account_no")
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false,name="account_type")
    private AccountType accountType;
    
    private BigDecimal balance;
    
    @Column(name = "is_locked")
    private Boolean isLocked=false;


    // Getters and Setters
}