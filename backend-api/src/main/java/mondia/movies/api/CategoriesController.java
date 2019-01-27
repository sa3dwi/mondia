package mondia.movies.api;

import mondia.movies.db.CategoryRepository;
import mondia.movies.db.MoviesRepository;
import mondia.movies.model.Category;
import org.jsondoc.core.annotation.Api;
import org.jsondoc.core.annotation.ApiMethod;
import org.jsondoc.core.annotation.ApiPathParam;
import org.jsondoc.core.pojo.ApiStage;
import org.jsondoc.spring.boot.starter.EnableJSONDoc;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.UUID;

@RestController
@CrossOrigin
@RequestMapping("/categories")
@EnableJSONDoc
@Api(
        name = "Mondia Media Categories API",
        description = "Provides a list of methods that manage categories",
        stage = ApiStage.RC)
public class CategoriesController {

    private MoviesRepository moviesRepository;
    private CategoryRepository categoryRepository;

    @Autowired
    public CategoriesController(MoviesRepository moviesRepository, CategoryRepository categoryRepository){
        this.moviesRepository = moviesRepository;
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("/all")
    @ApiMethod(description = "Get all Categories from the database")
    public List<Category> getAll(){
        return categoryRepository.findAll();
    }

    @PostMapping("/save/{categoryId}")
    @ApiMethod(description = "Create/update movie and save it to the database")
    public List<Category> create(@Valid  @RequestBody Category catEntity){
        categoryRepository.save(catEntity);
        return categoryRepository.findAll();
    }

    @GetMapping("/category/{id}")
    @ApiMethod(description = "Get category details with the provided ID from the database")
    public Category getById(@ApiPathParam(name = "id") @PathVariable String id) {
        Category catEntity = categoryRepository.findById(UUID.fromString(id)).orElse(null);
        return catEntity;
    }

    @RequestMapping("/delete/{id}")
    @ApiMethod(description = "Remove category with the provided ID from the database")
    public List<Category> remove(@ApiPathParam(name = "id") @PathVariable String id){
        categoryRepository.deleteById(UUID.fromString(id));

        return categoryRepository.findAll();
    }
}


