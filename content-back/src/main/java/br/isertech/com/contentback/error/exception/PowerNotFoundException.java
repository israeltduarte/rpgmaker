package br.isertech.com.contentback.error.exception;

import java.io.Serial;

public class PowerNotFoundException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    public PowerNotFoundException(String message) {
        super(message);
    }

}