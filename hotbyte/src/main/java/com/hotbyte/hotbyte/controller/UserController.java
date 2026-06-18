package com.hotbyte.hotbyte.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
	@GetMapping("/test")
	public Map<String, String> test() {
	    return Map.of("message", "User API accessed");
	}
}
