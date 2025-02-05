package com.bank.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import jakarta.servlet.http.HttpServletRequest;

@Configuration
public class SecurityConfig {
	
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception
	{
		return http.csrf(customizer -> customizer.disable()).build();
		
	}
	
}
