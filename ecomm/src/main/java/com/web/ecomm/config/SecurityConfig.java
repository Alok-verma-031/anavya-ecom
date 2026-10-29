package com.web.ecomm.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.web.ecomm.service.CustomerUserDetailService;

@Configuration
public class SecurityConfig {
	
	@Bean
	public PasswordEncoder passwordEncoder()
	{
		return new BCryptPasswordEncoder();
	}
	
//	Register 
	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception
	{
		http.csrf(AbstractHttpConfigurer::disable)
		.authorizeHttpRequests(auth->auth
		.requestMatchers("/api/auth/**").permitAll().anyRequest().authenticated()
		);
		return http.build();
	}
	
//login
    @Bean
    public AuthenticationProvider authenticationProvider(CustomerUserDetailService userDetailsService,
            PasswordEncoder passwordEncoder )
    {
        DaoAuthenticationProvider provider=new DaoAuthenticationProvider(userDetailsService);
       
        provider.setPasswordEncoder(passwordEncoder);
       
        return provider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {

        return configuration.getAuthenticationManager();
    }

}
