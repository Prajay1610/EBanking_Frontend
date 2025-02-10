package com.bank.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.bank.dtos.ApiResponse;
import com.bank.dtos.BankDataResponseDto;
import com.bank.dtos.BankManagerRespDto;
import com.bank.dtos.BankRespDto;
import com.bank.entities.Bank;
import com.bank.entities.BankAccount;
import com.bank.entities.BankManager;
import com.bank.entities.Customer;
import com.bank.entities.Role;
import com.bank.entities.User;
import com.bank.exception.ResourceNotFoundException;
import com.bank.repositories.BankManagerRepository;
import com.bank.repositories.BankRepository;
import com.bank.repositories.UserRepository;

import jakarta.transaction.Transactional;
@Transactional
@Service
public class AdminSeviceImpl implements AdminService {

	
	@Autowired
	public BankRepository bankRepository;
	
	@Autowired
	public UserRepository userRepository;
	
	@Autowired
	public BankManagerRepository bankManagerRepository;
	@Override
	public List<BankManagerRespDto> viewAllBankManager() {
		List<BankManager>bankManagers=bankManagerRepository.findAll();
		
		return bankManagers.stream().
				map(manager->new BankManagerRespDto(manager.getUser().getFname()+ " "+manager.getUser().getLname(),manager.getBank().getBankName(),manager.getUser().getEmail(),manager.getUser().getGender(),manager.getUser().getPhoneNo(),manager.getUser().getAddress(),manager.getId(),manager.getUser().getIsActive())).toList();
		// TODO Auto-generated method stub
		
	}
	@Override
	public List<BankRespDto> viewAllBanks() {
		// TODO Auto-generated method stub
		
		List<Bank>banks=bankRepository.findAll();
		return banks.stream().map(bank->new BankRespDto(bank.getBankName(),bank.getBankIfsc(),bank.getAddress(),bank.getPhone(),bank.getBankEmail(),bank.getBankWebsite(),bank.getBankCountry())).toList();
		
		
		
	}
	
	@Override
	public List<User> getAllBankManagersFromUser() {
		
		List<User> allBankManagers= userRepository.findByRole(Role.BANKMANAGER);
		
		// Assuming you have a bankManagerRepository to access the bankManager table
	    List<Long> bankManagerIds = bankManagerRepository.findAllUserIds(); // Get all userIds from bankManager table
	    
	    List<User> unlinkedBankManagers = allBankManagers.stream()
	            .filter(user -> !bankManagerIds.contains(user.getId())) // Negate the check to find users not linked
	            .collect(Collectors.toList()); // Collect the result into a new list
		
		return unlinkedBankManagers;

	}
	@Override
	public ApiResponse toggleManagerStatus(Long managerId) {
		// TODO Auto-generated method stub
		
	    BankManager manager  = bankManagerRepository.findById(managerId).orElseThrow(()->new ResourceNotFoundException("Can't find manager with id: "+managerId));
	    

		manager.getUser().setIsActive(!manager.getUser().getIsActive());
		
		return new ApiResponse("Status of manager updated to: "+manager.getUser().getIsActive());
	}
	@Override
	public ResponseEntity<?> getBankData() {
		List<BankDataResponseDto> data= bankRepository.getBankData();
		return ResponseEntity.status(HttpStatus.OK).body(data);
	}
	
	

}
