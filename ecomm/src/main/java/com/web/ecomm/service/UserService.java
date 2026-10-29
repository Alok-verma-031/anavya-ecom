package com.web.ecomm.service;
import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.web.ecomm.dto.RegisterRequest;
import com.web.ecomm.model.User;
import com.web.ecomm.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
public class UserService {
	
	private final UserRepository userRepository;
	private final PasswordEncoder passwordEncoder;
	
	public UserService(UserRepository userRepository,PasswordEncoder passwordEncoder)
	{
		this.passwordEncoder=passwordEncoder;
		this.userRepository=userRepository;
	}
	@Transactional
	public User userRegister(RegisterRequest request)
	{
		if(userRepository.existsByEmail(request.getEmail()))
		{
			throw new IllegalArgumentException("Email is already Exists !");
		}
		User user =new User();
		user.setName(request.getName());
		user.setEmail(request.getEmail());
		user.setPassword(passwordEncoder.encode(request.getPassword()));
		user.setAddress(request.getAddress());
		user.setContact(request.getContact());
		user.setRole("CUSTOMER");
		
		return userRepository.save(user);
	}
	
	public List<User> getAllUser()
	{
		return userRepository.findAll();
	}
	
	public User getUserById(Long id)
	{
		Optional<User> user =userRepository.findById(id);
		if(user.isEmpty()) return null;
		return user.get();
	}

}
