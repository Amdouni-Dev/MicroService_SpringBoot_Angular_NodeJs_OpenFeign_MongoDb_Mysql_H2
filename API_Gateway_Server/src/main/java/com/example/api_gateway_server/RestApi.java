package com.example.api_gateway_server;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RestApi {
    @GetMapping("/restGate")
    public String getGate(){
        return "Hiii Gateway!";
    }
}
