package br.isertech.com.contentback.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient("rpgmaker-back")
public interface ITUserClient {

    @GetMapping("/rpgmaker-back/api/test")
    String getTest();

}
