package com.hotbyte.hotbyte.config;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.*;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.*;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig {
    private final JwtFilter jwtFilter;
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.cors(cors -> {}).csrf(csrf -> csrf.disable())
        .authorizeHttpRequests(auth -> auth
        		.requestMatchers(
        			    "/api/auth/**",
        			    "/v3/api-docs/**",
        			    "/swagger-ui/**",
        			    "/swagger-ui.html"
        			).permitAll()
        // ✅ Public endpoints
        		//.requestMatchers("/api/auth/**").permitAll()
        // ✅ Admin only
        		.requestMatchers("/api/admin/**").hasAuthority("ADMIN")
        // ✅ Restaurant only
        		.requestMatchers("/api/restaurant/**").hasAuthority("RESTAURANT")
        // ✅ User only
        		.requestMatchers("/api/user/**").hasAuthority("USER")
        		.anyRequest().authenticated()
         )
         .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
