package com.bank.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.entities.Customer;
import com.bank.entities.Role;
import com.bank.entities.User;
import com.bank.exception.ResourceNotFoundException;
import com.bank.repositories.CustomerRepository;
import com.bank.repositories.UserRepository;

import jakarta.transaction.Transactional;


@Service
@Transactional
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private CustomerRepository customerRepository;
	@Override
	public User authenticate(String email, String password) {
		return userRepository.findByEmail(email).filter(u->u.getPassword().equals(password)).orElseThrow(()->new ResourceNotFoundException("User not found with email : "+email));
	}
	@Override
	public User registerUser(User user) {
		User persistentUser=userRepository.save(user);
		if(persistentUser.getRole()==Role.CUSTOMER)
		{
			Customer c = new Customer(user);
			customerRepository.save(c);
		}
		return persistentUser;
	}

}
