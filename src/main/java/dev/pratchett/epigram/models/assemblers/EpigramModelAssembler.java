package dev.pratchett.epigram.models.assemblers;

import dev.pratchett.epigram.controllers.EpigramController;
import dev.pratchett.epigram.models.Epigram;
import org.springframework.hateoas.EntityModel;
import org.springframework.hateoas.server.RepresentationModelAssembler;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.linkTo;
import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.methodOn;

@Component
public class EpigramModelAssembler implements RepresentationModelAssembler<Epigram, EntityModel<Epigram>> {
    @Override
    public EntityModel<Epigram> toModel(Epigram epigram) {
        return EntityModel.of(epigram, //
                linkTo(methodOn(EpigramController.class).one(epigram.getId())).withSelfRel(),
                linkTo(methodOn(EpigramController.class).all()).withRel("employees"));
    }
}
