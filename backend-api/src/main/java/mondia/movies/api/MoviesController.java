package mondia.movies.api;

import mondia.movies.db.CategoryRepository;
import mondia.movies.model.Category;
import org.jsondoc.core.annotation.Api;
import org.jsondoc.core.annotation.ApiMethod;
import org.jsondoc.core.annotation.ApiPathParam;
import org.jsondoc.spring.boot.starter.EnableJSONDoc;
import org.springframework.beans.factory.annotation.Autowired;
import org.jsondoc.core.pojo.ApiStage;
import org.springframework.web.bind.annotation.*;
import mondia.movies.db.MoviesRepository;
import mondia.movies.model.Movie;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/movies")
@EnableJSONDoc
@Api(
        name = "Mondia Media Movies API",
        description = "Provides a list of methods that manage Mondia Movies Online Database",
        stage = ApiStage.RC)
public class MoviesController {

    private MoviesRepository moviesRepository;
    private CategoryRepository categoryRepository;

    @Autowired
    public MoviesController(MoviesRepository moviesRepository, CategoryRepository categoryRepository){
        this.moviesRepository = moviesRepository;
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("/all")
    @ApiMethod(description = "Get all movies from the database")
    public List<Movie> getAll(){
        return moviesRepository.findAll();
    }

    @PostMapping("/save/{categoryId}")
    @ApiMethod(description = "Create/update movie and save it to the database")
    public String create(
            @PathVariable(value = "categoryId") String categoryId,
            @Valid @RequestBody Movie movieEntity){

        //
        Optional<Category> byId = categoryRepository.findById(UUID.fromString(categoryId));
        if (!byId.isPresent()) {
            // throw new ResourceNotFoundException("Category with id " + categoryId + " does not exist");
        }
        Category catEntity = byId.get();

        //tie Category to Movie
        movieEntity.setCategory(catEntity);

        // save movie
        moviesRepository.save(movieEntity);
        return " movie saved successful ";
    }

    @GetMapping("/movie/{id}")
    @ApiMethod(description = "Get movie details with the provided ID from the database")
    public Movie getById(@ApiPathParam(name = "id") @PathVariable String id) {
        Movie movieEntity = moviesRepository.findById(UUID.fromString(id)).orElse(null);
        return movieEntity;
    }

    @RequestMapping("/delete/{id}")
    @ApiMethod(description = "Remove movie with the provided ID from the database")
    public List<Movie> remove(@ApiPathParam(name = "id") @PathVariable String id){
        moviesRepository.deleteById(UUID.fromString(id));

        return moviesRepository.findAll();
    }
}


