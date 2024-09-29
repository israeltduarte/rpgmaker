package br.isertech.com.contentback.error.exception;

import java.io.Serial;

public class CityNotFoundException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    public CityNotFoundException(String message) {
        super(message);
    }

}