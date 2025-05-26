package dev.pratchett.epigram.models.metamodels;

import dev.pratchett.epigram.models.Epigram;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;

@StaticMetamodel(Epigram.class)
public class Epigram_ {
    public static volatile SingularAttribute<Epigram, Integer> id;

    public static volatile SingularAttribute<Epigram, String> content;
}
