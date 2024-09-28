package br.isertech.com.contentback.error.exception;

import java.io.Serial;

public class SortAttributesInvalidException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    public SortAttributesInvalidException(String message) {
        super(message);
    }

}