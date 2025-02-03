package com.bank.services;

import java.io.IOException;
import java.util.Optional;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bank.entities.User;

import jakarta.transaction.Transactional;


public interface UserService {

	public User authenticate(String email, String password);

	public User registerUser(User user);
	
	public void uploadProfileImage(Long userId, MultipartFile profileImage) throws IOException;
}
