package dev.pratchett.epigram.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Column;
import jakarta.validation.constraints.Size;
import jakarta.persistence.NamedQuery;

@Entity
@Table(name = "epigrams")
@NamedQuery(name = "EpigramModel.listIds",
        query = "select id from EpigramModel")
public class EpigramModel {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private int id;

    @Size(min = 3, max = 75)
    @Column(name = "content", nullable = false)
    private String content;

    public String GetContent() {
        return content;
    }

    public void setContent(String content) { this.content = content; }
}