package com.bank.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.dtos.BankManagerRespDto;
import com.bank.dtos.BankRespDto;
import com.bank.entities.Bank;
import com.bank.entities.BankManager;
import com.bank.entities.Gender;
import com.bank.repositories.AdminRepository;
import com.bank.repositories.BankManagerRepository;
import com.bank.repositories.BankRepository;

import jakarta.transaction.Transactional;
@Transactional
@Service
public class AdminSeviceImpl implements AdminService {

	
	@Autowired
	public BankRepository bankRepository;
	
	@Autowired
	public BankManagerRepository bankManagerRepository;
	@Override
	public List<BankManagerRespDto> viewAllBankManager() {
		List<BankManager>bankManagers=bankManagerRepository.findAll();
		
		return bankManagers.stream().
				map(manager->new BankManagerRespDto(manager.getUser().getFname()+ " "+manager.getUser().getLname(),manager.getBank().getBankName(),manager.getUser().getEmail(),manager.getUser().getGender(),manager.getUser().getPhoneNo(),manager.getUser().getAddress())).toList();
		// TODO Auto-generated method stub
		
	}
	@Override
	public List<BankRespDto> viewAllBanks() {
		// TODO Auto-generated method stub
		/*private String BankName;
	private String IfscCode;
	private String Address;
	private String PhoneNo;
	private String email;
	private String website;
	private String country;*/
		List<Bank>banks=bankRepository.findAll();
		return banks.stream().map(bank->new BankRespDto(bank.getBankName(),bank.getBankIfsc(),bank.getAddress(),bank.getPhone(),bank.getBankEmail(),bank.getBankWebsite(),bank.getBankCountry())).toList();
		
		
		
	}

}
