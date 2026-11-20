package com.web.ecomm.config;

import java.util.Locale;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.web.ecomm.model.User;
import com.web.ecomm.repository.UserRepository;

@Component
public class AdminAccountInitilizer implements CommandLineRunner {

		private UserRepository userRepository;
		private PasswordEncoder passwordEncoder;
		
		public AdminAccountInitilizer(UserRepository userRepository,PasswordEncoder passwordEncoder)
		{
			this.userRepository=userRepository;
			this.passwordEncoder=passwordEncoder;
		}
		@Value("${ADMIN_EMAIL}")
		private String adminEmail;
		
		@Value("${ADMIN_PASSWORD}")
		private String adminPassword;
		
			@Override
			public void run(String...strings) {
				
				if(adminEmail==null || adminEmail.isBlank() || adminPassword==null || adminPassword.isBlank() || adminPassword.length()<=8)
				{
					System.out.println("Invalid Email Or Password !");
					return;
				}
				
				String email=adminEmail.trim().toLowerCase(Locale.ROOT);
				var existingEmail=userRepository.findByEmail(email);
				if(existingEmail.isPresent())
				{
					if(!"ADMIN".equals(existingEmail.get().getRole()))
					{
						System.out.println("Email is already exist . but non-admin !");
						return;
					}
					System.out.println("Admin is already exist.");
					return;
				}
				User user=new User();
				user.setEmail(email);
				user.setName("ADMINISTRATOR");
				user.setPassword(passwordEncoder.encode(adminPassword));
				user.setAddress("Lucknow");
				user.setContact("0987654321");
				user.setRole("ADMIN");
				
				userRepository.save(user);
				System.out.println("Admin Created Successfully");
				
			}

		


}
