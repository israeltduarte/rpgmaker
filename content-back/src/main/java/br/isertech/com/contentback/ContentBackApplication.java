package br.isertech.com.contentback;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication
@EnableFeignClients
public class ContentBackApplication {

    public static void main(String[] args) {
        SpringApplication.run(ContentBackApplication.class, args);
    }

}
