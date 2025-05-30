package dev.pratchett.epigram.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import org.hibernate.annotations.ColumnDefault;
//import jakarta.validation.constraints.Size;

@Entity
@Table(name = "epigrams")
public class Epigram {
    public Epigram() {}

    public Epigram(Integer id, String content, Status status) {
        this.id = id;
        this.content = content;
        this.status = status;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Integer id;

    public Integer getId() { return id; }

    public void setId(Integer id) { this.id = id; }

    //TODO: Fix size annotation, as Hibernate did set a varchar length, so we're not unlimited
    //@Size(min = 3, max = 75)
    @Column(name = "content", nullable = false)
    private String content;

    public String getContent() {
        return content;
    }

    public void setContent(String content) { this.content = content; }

    @Override
    public String toString() { return String.format("Epigram #%s: %s", id, content); }

    public enum Status {
        PENDING,
        APPROVED,
        DELETED
    }

    @Column(name = "status", nullable = false)
    @ColumnDefault("0")
    private Status status;

    public Status getStatus() { return status; }

    public void setStatus(Status status) { this.status = status; }
}