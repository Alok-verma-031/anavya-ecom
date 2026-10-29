package com.web.ecomm.dto;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public class RegisterRequest {
	
	@NotBlank(message = "Name must be required")
	@Size(max=100,message="Name should me less then 100 characters")
	private String name;
	
	@Email(message = "Enter valid Email")
	@NotBlank(message = "Email must be required")
	@Size(max=100,message="Email should me less then 100 characters")
	private String email;
    
	@NotBlank(message = "password must be required")
	@Size(max=75,message="Password should me less then 75 characters")
	private String password;
	
	@NotBlank(message = "contact number is required")
	@Size(max=10,message="contact should me less then 11 characters")
	private String contact;
	
	@NotBlank(message = "Address is required")
	@Size(max=1000,message="address should me less then 1000 characters")
	private String address;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

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

	public String getContact() {
		return contact;
	}

	public void setContact(String contact) {
		this.contact = contact;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	
	
	
}
