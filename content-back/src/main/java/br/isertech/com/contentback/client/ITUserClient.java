package br.isertech.com.contentback.client;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

@FeignClient("${clients.auth-client.name}")
public interface ITUserClient {

    @GetMapping("${clients.auth-client.url}/api/test")
    String getTest();

}
