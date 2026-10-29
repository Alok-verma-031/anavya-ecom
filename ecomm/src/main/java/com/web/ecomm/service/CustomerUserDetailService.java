package com.web.ecomm.service;
import java.util.Collections;
import java.util.Locale;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import com.web.ecomm.model.User;
import com.web.ecomm.repository.UserRepository;
@Service
public class CustomerUserDetailService implements UserDetailsService 
{
	private final UserRepository userRepository;
	public CustomerUserDetailService(UserRepository userRepository)
	{
		this.userRepository=userRepository;
	}
	 
	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		String normlizedEmail=email.trim().toLowerCase(Locale.ROOT);
		User user=userRepository.findByEmail(normlizedEmail)
				.orElseThrow(()-> new UsernameNotFoundException("User not found with email "+ normlizedEmail));
		return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), 
				Collections.singletonList(new SimpleGrantedAuthority("ROLE_"+user.getRole())));
	}
}
