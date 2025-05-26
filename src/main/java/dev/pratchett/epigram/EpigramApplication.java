package dev.pratchett.epigram;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.ui.Model;
import dev.pratchett.epigram.repositories.EpigramRepository;
import dev.pratchett.epigram.models.Epigram;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@SpringBootApplication
@RestController
@EnableJpaRepositories("dev.pratchett.epigram.repositories")
public class EpigramApplication {
	private final Logger logger = LoggerFactory.getLogger(EpigramApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(EpigramApplication.class, args);
	}

	@Bean
	public CommandLineRunner demo(EpigramRepository repository) {
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

			logger.info("Epigrams found:");
			allEpigrams.forEach(epigram -> logger.info(epigram.toString()));
		};
	}

	@GetMapping("/hello")
	public String hello(@RequestParam(value = "name", defaultValue = "World") String name, Model model) {
		model.addAttribute("name", name);
		return "hello";
	}

}
