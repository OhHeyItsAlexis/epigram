package dev.pratchett.epigram;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.ui.Model;
import dev.pratchett.epigram.repositories.EpigramRepository;
import dev.pratchett.epigram.models.EpigramModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import java.util.List;
import java.util.logging.Logger;

@SpringBootApplication
@RestController
public class EpigramApplication {
	@Autowired
	private EpigramRepository repository;

	@Autowired
	private Logger logger;

	public static void main(String[] args) {
		SpringApplication.run(EpigramApplication.class, args);
	}

	@EventListener(ApplicationReadyEvent.class)
	public void runAfterStartup() {
		// Check to see if we have any epigrams present, if not seed DB
		List<EpigramModel> allEpigrams = this.repository.listIds();
		logger.info("Number of epigrams: " + allEpigrams.size());
		if (allEpigrams.size() == 0) {
			EpigramModel demoEpigram = new EpigramModel();
			demoEpigram.setContent("Little strokes fell great oaks.");
			logger.info("Saving new epigram...");
			this.repository.save(demoEpigram);
			allEpigrams = this.repository.listIds();
			logger.info("Number of epigrams: " + allEpigrams.size());
		}
	}

	@GetMapping("/hello")
	public String hello(@RequestParam(value = "name", defaultValue = "World") String name, Model model) {
		model.addAttribute("name", name);
		return "hello";
	}

}
