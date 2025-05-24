package dev.pratchett.epigram.repositories;

import java.util.List;
import org.springframework.data.repository.CrudRepository;
import dev.pratchett.epigram.models.EpigramModel;

public interface EpigramRepository extends CrudRepository<EpigramModel, Integer>{
    List<EpigramModel> listIds();

    EpigramModel findById(int id);
}