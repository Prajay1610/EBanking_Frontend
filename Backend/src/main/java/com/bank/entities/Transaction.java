package com.bank.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString(exclude = {"account","transfer","transactionType"})
@Table(name = "Transactions")
public class Transaction extends BaseEntity {
    

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private BankAccount account;
    
   @ManyToOne
   @JoinColumn(name = "transfer_id") 
    private TransferDetail transfer;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false,name="transaction_type")
    private TransactionType transactionType;

    @Column(nullable = false, precision = 15, scale = 2)
    private BigDecimal amount;

    @Column(length = 255)
    private String description;
    
    @Column(name = "transaction_date")
    private LocalDateTime createdOn;
}
