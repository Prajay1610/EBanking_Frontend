package com.bank.controllers;

import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bank.dtos.ApiResponse;
import com.bank.dtos.AuthRequest;
import com.bank.dtos.AuthResponse;
import com.bank.entities.User;
import com.bank.exception.UnauthorizedAccessException;
import com.bank.repositories.BankManagerRepository;
import com.bank.repositories.CustomerRepository;
import com.bank.repositories.UserRepository;
import com.bank.security.CustomUserDetailsService;
import com.bank.security.JwtUtil;
import com.bank.services.UserService;



@CrossOrigin(origins="http://localhost:3000")
@RestController
@RequestMapping("/api/auth")
public class AuthController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private CustomUserDetailsService userDetailsService;
    
   @Autowired
   private BankManagerRepository bankManagerRepo;
    
    @Autowired
    private PasswordEncoder encoder;
    
    @Autowired
    private CustomerRepository customerRepo;
    
    @Autowired
    private JwtUtil jwtUtil;
    
	
	@PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@RequestBody AuthRequest authRequest)  {
		
		 final UserDetails userDetails = userDetailsService.loadUserByUsername(authRequest.getEmail());
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getEmail(), authRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            throw new UnauthorizedAccessException("Incorrect username or password");
        }
        
        boolean isBankManager = userDetails.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_BANKMANAGER"));
        
        boolean isCustomer = userDetails.getAuthorities().stream()
                .anyMatch(auth -> auth.getAuthority().equals("ROLE_CUSTOMER"));
        
        Map<String, Object> additionalClaims = new HashMap<>();
        if (isBankManager) {
            Long bankId = bankManagerRepo.findByUserId(userRepository.findByEmail(authRequest.getEmail()).get().getId()).getId();
            additionalClaims.put("bankId", bankId);
        }
        
        if(isCustomer)
        {
        	Long customerId=customerRepo.findByUserId(userRepository.findByEmail(authRequest.getEmail()).get().getId()).get().getId();
        	System.out.println("Customer id : "+customerId);
        	additionalClaims.put("customerId", customerId);
        }
       
        final String jwt = jwtUtil.generateToken(userDetails,additionalClaims);
        return ResponseEntity.ok(new AuthResponse(jwt));
    }
	
	
	
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody User user)
	{
		user.setPassword(encoder.encode(user.getPassword()));
		return ResponseEntity.ok(userService.registerUser(user));
	}
	
	@PostMapping("/{userId}/upload-profile-image")
    public ResponseEntity<String> uploadProfileImage(
            @PathVariable Long userId,
            @RequestParam("file") MultipartFile file) {
        try {
            userService.uploadProfileImage(userId, file);
            return ResponseEntity.ok("Profile image uploaded successfully!");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to upload profile image: " + e.getMessage());
        }
    }
	
	
	@GetMapping("/{userId}/profile-image")
	public ResponseEntity<byte[]> getProfileImage(@PathVariable Long userId) {
	    User user = userRepository.findById(userId)
	            .orElseThrow(() -> new RuntimeException("User not found with ID: " + userId));

	    byte[] imageBytes = user.getProfileImage();
	    if (imageBytes == null) {
	        return ResponseEntity.notFound().build();
	    }

	    return ResponseEntity.ok()
	            .header("Content-Type", "image/jpeg") // Adjust content type based on the image format
	            .body(imageBytes);

	}
	
	
}
