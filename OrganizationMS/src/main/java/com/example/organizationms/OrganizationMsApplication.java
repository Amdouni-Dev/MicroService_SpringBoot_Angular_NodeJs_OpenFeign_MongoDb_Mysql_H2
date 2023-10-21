package com.example.organizationms;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;

@EnableEurekaClient
@SpringBootApplication
public class OrganizationMsApplication {

    public static void main(String[] args) {
        SpringApplication.run(OrganizationMsApplication.class, args);
    }

}
