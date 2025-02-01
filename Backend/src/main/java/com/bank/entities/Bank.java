package com.bank.entities;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import jakarta.persistence.*;

@Entity
@Table(name = "Banks")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Bank extends BaseEntity{


    @Column(nullable = false,name="bank_name")
    private String bankName;

    @Column(nullable = false)
    private String phone;
    
    private String address;

    @Column(nullable = false, unique = true,name="bank_ifsc")
    private String bankIfsc;

    @Column(nullable = false, unique = true,name="bank_website")
    private String bankWebsite;

    @Column(nullable = false, unique = true,name="bank_email")
    private String bankEmail;
    
    @Column(nullable=false,name="bank_country")
    private String bankCountry;
    

    // Getters and Setters
}
