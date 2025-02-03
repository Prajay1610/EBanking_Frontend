package com.bank.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bank.entities.TransferDetail;

public interface TransferRepository extends JpaRepository<TransferDetail, Long>{

}
