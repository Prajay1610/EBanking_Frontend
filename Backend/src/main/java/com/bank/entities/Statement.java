package com.bank.entities;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Statements")
public class Statement extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private BankAccount account;

    @Column(nullable = false,name="start_date")
    private LocalDate startDate;

    @Column(nullable = false,name="end_date")
    private LocalDate endDate;

    @Column(nullable = false, precision = 15, scale = 2,name="starting_balance")
    private BigDecimal startingBalance;

    @Column(nullable = false, precision = 15, scale = 2,name="ending_balance")
    private BigDecimal endingBalance;

}
