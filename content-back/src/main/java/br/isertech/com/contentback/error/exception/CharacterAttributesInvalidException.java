package br.isertech.com.contentback.error.exception;

import java.io.Serial;

public class CharacterAttributesInvalidException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    public CharacterAttributesInvalidException(String message) {
        super(message);
    }

}