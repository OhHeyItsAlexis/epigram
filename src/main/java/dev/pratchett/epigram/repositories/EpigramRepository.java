package dev.pratchett.epigram.repositories;


import jakarta.transaction.Transactional;
import dev.pratchett.epigram.models.Epigram;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Transactional
@Repository
public interface EpigramRepository extends JpaRepository<Epigram, Integer> {
    @Query(value = "SELECT e.id, e.content, e.status FROM epigrams e WHERE e.status = 1 ORDER BY random() LIMIT 1", nativeQuery = true)
    public Epigram getRandomEpigram();
}