package com.bank.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.bank.dtos.BankManagerRespDto;
import com.bank.entities.BankManager;
import com.bank.entities.Gender;
import com.bank.repositories.AdminRepository;
import com.bank.repositories.BankManagerRepository;

import jakarta.transaction.Transactional;
@Transactional
@Service
public class AdminSeviceImpl implements AdminService {

	
	@Autowired
	public BankManagerRepository bankManagerRepository;
	@Override
	public List<BankManagerRespDto> viewAllBankManager() {
		List<BankManager>bankManagers=bankManagerRepository.findAll();
		/*private String AdminName;
	private String BankName;
	private String Email;
	private Gender gender;
	private String contactNo;
	private String Address;
	*/
		return bankManagers.stream().
				map(manager->new BankManagerRespDto(manager.getUser().getFname()+ " "+manager.getUser().getLname(),manager.getBank().getBankName(),manager.getUser().getEmail(),manager.getUser().getGender(),manager.getUser().getPhoneNo(),manager.getUser().getAddress())).toList();
		// TODO Auto-generated method stub
		
	}

}
