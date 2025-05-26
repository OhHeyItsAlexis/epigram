package dev.pratchett.epigram.controllers;

import dev.pratchett.epigram.exceptions.EpigramNotFoundException;
import dev.pratchett.epigram.models.Epigram;
import dev.pratchett.epigram.repositories.EpigramRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class EpigramController {
    private final EpigramRepository repository;

    EpigramController(EpigramRepository repository) {
        this.repository = repository;
    }

    // Aggregate root
    // tag::get-aggregate-root[]
    @GetMapping("/epigrams")
    List<Epigram> all() {
        return repository.findAll();
    }
    // end::get-aggregate-root[]

    @GetMapping("/epigrams/random")
    Epigram random() {
        return repository.getRandomEpigram();
    }

    @PostMapping("/epigrams")
    Epigram newEpigram(@RequestBody Epigram newEpigram) {
        return repository.save(newEpigram);
    }

    // Single item
    @GetMapping("/epigrams/{id}")
    Epigram one(@PathVariable Integer id) throws EpigramNotFoundException {
        return repository.findById(id)
                .orElseThrow(() -> new EpigramNotFoundException(id));
    }

    @PutMapping("/epigrams/{id}")
    Epigram replaceEpigram(@RequestBody Epigram newEpigram, @PathVariable Integer id) {
        return repository.findById(id)
                .map(Epigram -> {
                    Epigram.setContent(newEpigram.getContent());
                    return repository.save(Epigram);
                })
                .orElseGet(() -> repository.save(newEpigram));
    }

    @DeleteMapping("/epigrams/{id}")
    void deleteEpigram(@PathVariable Integer id) {
        repository.deleteById(id);
    }
}
