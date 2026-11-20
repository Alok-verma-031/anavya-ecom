package com.web.ecomm.controller;

import java.util.LinkedHashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.web.ecomm.dto.LoginRequest;
import com.web.ecomm.dto.RegisterRequest;
import com.web.ecomm.model.User;
import com.web.ecomm.service.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	private final UserService userService;
	private final AuthenticationManager authenticationManager;
	public AuthController(UserService userService, AuthenticationManager authenticationManager) {
		this.userService = userService;
		this.authenticationManager = authenticationManager;
	}

	@PostMapping("/register")
	public ResponseEntity<Map<String, Object>> registerUser(@Valid @RequestBody RegisterRequest request) {

		Map<String, Object> response = new LinkedHashMap<String, Object>();
		try {
			User user = userService.userRegister(request);
			response.put("message", "User Registered Successfully !");
			response.put("id", user.getId());
			response.put("name", user.getName());
			response.put("email", user.getEmail());
			response.put("role", user.getRole());

			return ResponseEntity.status(HttpStatus.CREATED).body(response);
		} catch (IllegalArgumentException ex) {
			response.put("message", ex.getMessage());
			return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
		}
	}

	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> login(@Valid @RequestBody LoginRequest request,
			HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
		try {
			Authentication authentication = authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

			SecurityContext context = SecurityContextHolder.createEmptyContext();

			context.setAuthentication(authentication);
			SecurityContextHolder.setContext(context);

			HttpSessionSecurityContextRepository repository = new HttpSessionSecurityContextRepository();

			repository.saveContext(context, httpRequest, httpResponse);

			String role = authentication.getAuthorities().iterator().next().getAuthority().replace("ROLE_", "");

			Map<String, Object> response = new LinkedHashMap<>();
			response.put("message", "Login Successfully.");
			response.put("email", authentication.getName());
			response.put("role", role);

			return ResponseEntity.ok(response);

		} catch (AuthenticationException ex) {
			SecurityContextHolder.clearContext();

			Map<String, Object> response = new LinkedHashMap<>();
			response.put("message", "Invalid email or password.");

			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
		}
	}
	   @PostMapping("/logout")
	   public ResponseEntity<Map<String, String>> logout(HttpServletRequest request)
	   {
	       HttpSession session=request.getSession(false);
	       
	       if(session!=null)
	       {
	           session.invalidate();
	       }
	       
	       SecurityContextHolder.clearContext();
	       
	       Map<String, String> response=new LinkedHashMap<>();
	       response.put("message", "Logout Successfully.");
	       
	       return ResponseEntity.ok(response);
	   }
}
