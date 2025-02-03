package com.bank.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.bank.entities.User;

public interface AdminRepository extends JpaRepository<User, Long> {
	
	

}
