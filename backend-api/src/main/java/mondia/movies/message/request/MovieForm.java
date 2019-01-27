package mondia.movies.message.request;

import com.fasterxml.jackson.annotation.JsonIgnore;
import mondia.movies.model.Category;
import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.UUID;

@Entity
public class MovieForm {
    @Id
    @Column(columnDefinition = "BINARY(16)")
    @GeneratedValue
    private UUID id;

    @NotBlank
    private String title;

    @Column(columnDefinition="TEXT")
    private String description;

    @Column(precision=10, scale=2)
    private int rate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "categoryId")

    private Category category;


    protected MovieForm() {
        this.id = UUID.randomUUID();
    }

    public MovieForm(String title, String description, int rate, Category category) {
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

    public int getRate() {
        return rate;
    }

    public void setRate(int rate) {
        this.rate = rate;
    }
}
