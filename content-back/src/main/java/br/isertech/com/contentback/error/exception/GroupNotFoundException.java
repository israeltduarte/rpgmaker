package br.isertech.com.contentback.error.exception;

import java.io.Serial;

public class GroupNotFoundException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    public GroupNotFoundException(String message) {
        super(message);
    }

}