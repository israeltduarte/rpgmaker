package br.isertech.com.contentback.error;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CustomErrorResponse {

    private int status;
    private String message;

}
