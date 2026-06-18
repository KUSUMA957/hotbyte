package com.hotbyte.hotbyte.controller;

import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @GetMapping("/test")
    public String test() {
        return "User API accessed";
    }
}