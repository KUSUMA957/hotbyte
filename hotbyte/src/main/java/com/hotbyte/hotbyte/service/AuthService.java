package com.hotbyte.hotbyte.service;

import com.hotbyte.hotbyte.dto.RegisterRequest;
import java.util.Map;
import com.hotbyte.hotbyte.dto.LoginRequest;

public interface AuthService {
    Map<String, String> register(RegisterRequest request);
    Map<String, Object> login(LoginRequest request);
}