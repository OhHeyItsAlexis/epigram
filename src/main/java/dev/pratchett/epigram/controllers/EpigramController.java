package dev.pratchett.epigram.controllers;

import dev.pratchett.epigram.exceptions.EpigramNotFoundException;
import dev.pratchett.epigram.models.Epigram;
import dev.pratchett.epigram.models.assemblers.EpigramModelAssembler;
import dev.pratchett.epigram.repositories.EpigramRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.IanaLinkRelations;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@RestController
public class EpigramController {
    private static final Logger log = LoggerFactory.getLogger(EpigramController.class);
    private final EpigramRepository repository;
    private final EpigramModelAssembler assembler;

    EpigramController(EpigramRepository repository, EpigramModelAssembler assembler) {
        this.repository = repository;
        this.assembler = assembler;
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/epigrams")
    public List<EntityModel<Epigram>> all() {
        return repository.findAll().stream()
                .map(assembler::toModel)
                .collect(Collectors.toList());
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/epigrams/random")
    EntityModel<Epigram> random() {
        Epigram epigram = repository.getRandomEpigram();

        return assembler.toModel(epigram);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PostMapping("/epigrams")
    ResponseEntity<EntityModel<Epigram>> newEpigram(@RequestBody Epigram newEpigram) {
        newEpigram.setId(null);
        // TODO: Have this save as pending once we have a page for approvals
        newEpigram.setStatus(Epigram.Status.APPROVED);
        Epigram epigram = repository.save(newEpigram);
        EntityModel<Epigram> entityModel = assembler.toModel(epigram);
        log.info("New Epigram Created: {}", entityModel);

        return ResponseEntity
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri()) //
                .body(entityModel);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @GetMapping("/epigrams/{id}")
    public EntityModel<Epigram> one(@PathVariable Integer id) {
        Epigram epigram = repository.findById(id)
                .orElseThrow(() -> new EpigramNotFoundException(id));

        return assembler.toModel(epigram);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @PutMapping("/epigrams/{id}")
    ResponseEntity<EntityModel<Epigram>> replaceEpigram(@RequestBody Epigram newEpigram, @PathVariable Integer id) {
        Epigram epigram = repository.findById(id)
                .map(Epigram -> {
                    Epigram.setContent(newEpigram.getContent());
                    return repository.save(Epigram);
                })
                .orElseGet(() -> repository.save(newEpigram));

        EntityModel<Epigram> entityModel = assembler.toModel(epigram);

        return ResponseEntity
                .created(entityModel.getRequiredLink(IanaLinkRelations.SELF).toUri())
                .body(entityModel);
    }

    @CrossOrigin(origins = "http://localhost:4200")
    @DeleteMapping("/epigrams/{id}")
    ResponseEntity<?> deleteEpigram(@PathVariable Integer id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
