package casa.eric.erzieherapp.backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.NoSuchElementException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NoSuchElementException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    public ErrorMessage handleNoSuchElementException(NoSuchElementException e) {
        return new ErrorMessage(e.getMessage());
    }

    @ExceptionHandler(com.mongodb.MongoWriteException.class)
    @ResponseStatus(HttpStatus.CONFLICT)
    public ErrorMessage handleMongoWriteException(com.mongodb.MongoWriteException e) {
        return new ErrorMessage(e.getMessage());
    }
}
