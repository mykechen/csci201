package com.team10.demo.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {
    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/")
    public String sayHello() {
        return "Hello from Spring Boot!";
    }
}
