package com.bank.entities;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "BankManagers")
public class BankManager extends BaseEntity {
 
    @OneToOne 
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @OneToOne
    @JoinColumn(name = "bank_id", nullable = false)
    private Bank bank;


}
