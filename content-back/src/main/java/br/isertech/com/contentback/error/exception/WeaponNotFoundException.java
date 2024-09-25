package br.isertech.com.contentback.error.exception;

import java.io.Serial;

public class WeaponNotFoundException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    public WeaponNotFoundException(String message) {
        super(message);
    }

}