package com.bank.services;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.bank.entities.AccountType;
import com.bank.entities.BankAccount;
import com.bank.entities.Customer;
import com.bank.entities.Role;
import com.bank.entities.User;
import com.bank.exception.ResourceNotFoundException;
import com.bank.repositories.BankAccountRepository;
import com.bank.repositories.BankRepository;
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
	
	@Autowired
	private BankAccountRepository bankAccRepository;
	
	@Autowired
	private BankRepository bankRepo;
	
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
			
				BankAccount newBankAc = new BankAccount();
				newBankAc.setCustomer(c);
				newBankAc.setAccountType(user.getAccountType());
				newBankAc.setBank(bankRepo.findById(user.getBankId()).get());
				
				bankAccRepository.save(newBankAc);
	
		}
		
		return persistentUser;
	}
	
	
	@Override
	public void uploadProfileImage(Long userId, MultipartFile profileImage) throws IOException {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

        byte[] imageBytes = profileImage.getBytes();

        user.setProfileImage(imageBytes);

        userRepository.save(user);
    }

}
