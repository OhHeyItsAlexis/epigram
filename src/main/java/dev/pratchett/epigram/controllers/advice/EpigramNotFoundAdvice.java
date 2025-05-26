package dev.pratchett.epigram.controllers.advice;

import dev.pratchett.epigram.exceptions.EpigramNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class EpigramNotFoundAdvice {
    @ExceptionHandler(EpigramNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String employeeNotFoundHandler(EpigramNotFoundException ex) {
        return ex.getMessage();
    }
}
