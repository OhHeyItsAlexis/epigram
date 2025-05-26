package dev.pratchett.epigram;

import dev.pratchett.epigram.models.Epigram;
import dev.pratchett.epigram.repositories.EpigramRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;

import java.util.List;

public class LoadDatabase {
    private static final Logger logger = LoggerFactory.getLogger(LoadDatabase.class);

    @Bean
    CommandLineRunner initDatabase(EpigramRepository repository) {
        return (args) -> {
            // Check to see if we have any epigrams present, if not seed DB
            List<Epigram> allEpigrams = repository.findAll();

            if (allEpigrams.isEmpty()) {
                logger.info("No epigrams found, initializing DB.");
                Epigram demoEpigram = new Epigram();
                demoEpigram.setContent("Little strokes fell great oaks.");
                logger.info("Saving epigram 1...");
                repository.save(demoEpigram);

                demoEpigram = new Epigram();
                demoEpigram.setContent("Not all those who wander are lost.");
                logger.info("Saving epigram 2...");
                repository.save(demoEpigram);

                demoEpigram = new Epigram();
                demoEpigram.setContent("A room without books is like a body without a soul.");
                logger.info("Saving epigram 3...");
                repository.save(demoEpigram);

                demoEpigram = new Epigram();
                demoEpigram.setContent("I can resist everything except temptation.");
                logger.info("Saving epigram 4...");
                repository.save(demoEpigram);
                repository.flush();
                allEpigrams = repository.findAll();
            }

            logger.info(String.format("Found %s epigrams!", allEpigrams.size()));

            Epigram randomEpigram = repository.getRandomEpigram();
            logger.info(String.format("Your random epigram: %s", randomEpigram.getContent()));
        };
    }
}
