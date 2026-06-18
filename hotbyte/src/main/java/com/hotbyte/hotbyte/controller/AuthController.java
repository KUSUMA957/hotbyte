package com.hotbyte.hotbyte.controller;

import com.hotbyte.hotbyte.dto.RegisterRequest;
import jakarta.validation.Valid;
import com.hotbyte.hotbyte.dto.LoginRequest;
import com.hotbyte.hotbyte.dto.AuthResponse;
import jakarta.validation.Valid;
import com.hotbyte.hotbyte.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;
    @PostMapping("/register")
    public String register(@Valid @RequestBody RegisterRequest request) {
        return authService.register(request);
    }
    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody LoginRequest request) {
        return authService.login(request);
    }
}