package br.isertech.com.contentback.error;

import br.isertech.com.contentback.error.exception.CharacterNotFoundException;
import br.isertech.com.contentback.error.exception.OperationFailedException;
import br.isertech.com.contentback.error.exception.PowerNotFoundException;
import br.isertech.com.contentback.error.exception.WeaponNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

@ControllerAdvice
public class CustomExceptionHandler extends ResponseEntityExceptionHandler {

//    @ExceptionHandler(Exception.class)
//    public ResponseEntity<CustomErrorResponse> customException(Exception e) {
//
//        CustomErrorResponse errors = CustomErrorResponse.builder().message(e.getMessage())
//                .status(HttpStatus.INTERNAL_SERVER_ERROR.value()).build();
//
//        return new ResponseEntity<>(errors, HttpStatus.INTERNAL_SERVER_ERROR);
//    }

    @ExceptionHandler(CharacterNotFoundException.class)
    public ResponseEntity<CustomErrorResponse> characterNotFound(Exception e) {

        CustomErrorResponse errors = CustomErrorResponse.builder()
                .message(e.getMessage())
                .status(HttpStatus.NOT_FOUND.value())
                .build();

        return new ResponseEntity<>(errors, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(WeaponNotFoundException.class)
    public ResponseEntity<CustomErrorResponse> weaponNotFound(Exception e) {

        CustomErrorResponse errors = CustomErrorResponse.builder()
                .message(e.getMessage())
                .status(HttpStatus.NOT_FOUND.value())
                .build();

        return new ResponseEntity<>(errors, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(PowerNotFoundException.class)
    public ResponseEntity<CustomErrorResponse> powerNotFound(Exception e) {

        CustomErrorResponse errors = CustomErrorResponse.builder()
                .message(e.getMessage())
                .status(HttpStatus.NOT_FOUND.value())
                .build();

        return new ResponseEntity<>(errors, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(OperationFailedException.class)
    public ResponseEntity<CustomErrorResponse> operationFailed(Exception e) {

        CustomErrorResponse errors = CustomErrorResponse.builder()
                .message(e.getMessage())
                .status(HttpStatus.BAD_REQUEST.value())
                .build();

        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }
}