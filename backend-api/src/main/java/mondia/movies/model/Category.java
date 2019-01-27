package mondia.movies.model;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Entity
public class Category {
    @Id
    @Column(columnDefinition = "BINARY(16)")
    private UUID id;
    private String name;

    @OneToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL, mappedBy = "category")

    private List<Movie> movies;


    protected Category() {
        this.id = UUID.randomUUID();
        this.movies = new ArrayList<>();
    }

    public Category(String name) {
        this();
        this.name = name;
    }

    public Category(String id, String name) {
        this();
        if (id != null) {
            this.id = UUID.fromString(id);
        }
        this.name = name;
    }

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<Movie> getMovies() {
        return movies;
    }

    public int getNbOfMovies() {
        return this.movies.size();
    }
}