package br.isertech.com.contentback.error.exception;

import java.io.Serial;

public class CharacterNotFoundException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    public CharacterNotFoundException(String message) {
        super(message);
    }

}