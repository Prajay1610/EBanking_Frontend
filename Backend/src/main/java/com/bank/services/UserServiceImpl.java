package com.bank.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.entities.User;

import com.bank.repositories.UserRepository;

import jakarta.transaction.Transactional;


@Service
@Transactional
public class UserServiceImpl implements UserService {
	
	@Autowired
	private UserRepository userRepository;
	@Override
	public Optional<User> authenticate(String email, String password) {
		return userRepository.findByEmail(email).filter(u->u.getPassword().equals(password));
	}
	@Override
	public User registerUser(User user) {
		return userRepository.save(user);
	}

}
