package dev.pratchett.epigram.exceptions;

public class EpigramNotFoundException extends Exception {
    public EpigramNotFoundException(Integer id) {
        super("Could not find epigram " + id);
    }
}
