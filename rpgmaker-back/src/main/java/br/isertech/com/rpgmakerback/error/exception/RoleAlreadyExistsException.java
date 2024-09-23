package br.isertech.com.rpgmakerback.error.exception;

import java.io.Serial;

public class RoleAlreadyExistsException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 1L;

    public RoleAlreadyExistsException(String message) {
        super(message);
    }

}
