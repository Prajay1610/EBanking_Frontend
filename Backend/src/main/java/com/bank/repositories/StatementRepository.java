package com.bank.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bank.entities.Statement;

public interface StatementRepository extends JpaRepository<Statement,Long>{
	
}
