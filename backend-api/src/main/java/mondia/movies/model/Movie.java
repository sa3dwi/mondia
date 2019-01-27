package mondia.movies.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.UUID;

@Entity
public class Movie {
    @Id
    @Column(columnDefinition = "BINARY(16)")
    @GeneratedValue
    private UUID id;

    @NotBlank
    @Size(min = 3, max = 50)
    private String title;

    @Column(columnDefinition="TEXT")
    private String description;

    private Integer rate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoryId")

    private Category category;


    protected Movie() {
        this.id = UUID.randomUUID();
    }

    public Movie(String title, String description, Integer rate, Category category) {
        this();
        this.title = title;
        this.description = description;
        this.rate = rate;
        this.category = category;
    }

    @JsonIgnore
    public Category getCategory() {
        return category;
    }

    @JsonIgnore
    public void setCategory(Category category) {
        this.category = category;
    }

    public UUID getCategoryId() {
        return this.category.getId();
    }

    public UUID getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getRate() {
        return rate;
    }

    public void setRate(Integer rate) {
        this.rate = rate;
    }
}
