package com.hotbyte.hotbyte.service;

import com.hotbyte.hotbyte.dto.RegisterRequest;
import com.hotbyte.hotbyte.dto.AuthResponse;
import com.hotbyte.hotbyte.dto.LoginRequest;

public interface AuthService {
    String register(RegisterRequest request);
    AuthResponse login(LoginRequest request);
}