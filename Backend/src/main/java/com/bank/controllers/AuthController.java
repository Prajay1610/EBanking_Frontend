package com.bank.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import com.bank.entities.*;
import com.bank.repositories.UserRepository;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.bank.dtos.ApiResponse;
import com.bank.dtos.LoginRequest;
import com.bank.services.UserService;




@RestController
@RequestMapping("/api/auth")
public class AuthController {
	
	@Autowired
	private UserService userService;
	
	@Autowired
	private UserRepository userRepository;
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@RequestBody LoginRequest request)
	{
		User user=userService.authenticate(request.getEmail(),request.getPassword());
		if(user!=null)
		{
			return ResponseEntity.ok(user);
		}else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(new ApiResponse("Invalid credentials"));
		}
	}
	
	
	
	@PostMapping("/register")
	public ResponseEntity<?> register(@RequestBody User user)
	{

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
