package dev.pratchett.epigram.repositories;


import jakarta.transaction.Transactional;
import dev.pratchett.epigram.models.Epigram;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Transactional
@Repository
public interface EpigramRepository extends JpaRepository<Epigram, Integer> {
}