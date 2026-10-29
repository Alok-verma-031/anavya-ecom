package com.web.ecomm.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class LoginRequest {
	
	@NotBlank(message="Email is Required")
	@Email
	private String email;
	
	@NotBlank(message="password is Required")
	@Size(max=75,message="password must be less than 75 charecters !")
	private String password;

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	

}
