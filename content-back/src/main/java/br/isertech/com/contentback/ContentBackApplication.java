package br.isertech.com.contentback;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.web.bind.annotation.CrossOrigin;

@SpringBootApplication
@CrossOrigin(origins = "*", maxAge = 3600)
@EnableFeignClients
public class ContentBackApplication {

    public static void main(String[] args) {
        SpringApplication.run(ContentBackApplication.class, args);
    }

}
