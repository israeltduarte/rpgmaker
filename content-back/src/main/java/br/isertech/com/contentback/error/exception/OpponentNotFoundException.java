package br.isertech.com.contentback.error.exception;

import java.io.Serial;

public class OpponentNotFoundException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    public OpponentNotFoundException(String message) {
        super(message);
    }

}