package mondia.movies.db;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import mondia.movies.model.Movie;
import mondia.movies.model.Category;
import mondia.movies.model.User;

/**
 * add initial username and password
 * add some movie items with categories
 */
@Component
public class DbSeeder implements CommandLineRunner {
    private MoviesRepository moviesRepository;
    private CategoryRepository categoryRepository;
    private UsersRepository usersRepository;

    @Autowired
    PasswordEncoder encoder;

    @Autowired
    public DbSeeder(MoviesRepository moviesRepository, CategoryRepository categoryRepository, UsersRepository usersRepository){
        this.moviesRepository = moviesRepository;
        this.categoryRepository = categoryRepository;
        this.usersRepository = usersRepository;
    }

    @Override
    public void run(String... args) {
        // Remove all existing entities
        moviesRepository.deleteAll();
        categoryRepository.deleteAll();

        // add Comedy category
        Category defaultCategory = new Category("Comedy");
        categoryRepository.save(defaultCategory);

        // add Action category
        Category actionCat = new Category("Action");
        categoryRepository.save(actionCat);

        // add Thriller category
        Category thriller = new Category("Thriller");
        categoryRepository.save(thriller);

        // Save Movies
        moviesRepository.save(new Movie("Bird Box", "When a mysterious force decimates the population, only one thing is certain if you see it, you die. The survivors must now avoid coming face to face with an entity that takes the form of their worst fears. Searching for hope and a new beginning, a woman and her children embark on a dangerous ", 9, defaultCategory));
        moviesRepository.save(new Movie("A Star is Born", "Seasoned musician Jackson Maine discovers and falls in love with struggling artist Ally. She has just about given up on her dream to make it big as a singer until Jackson coaxes her into the spotlight. But even as Ally's career takes off, the personal side of their relationship is breaking ", 5, actionCat));
        moviesRepository.save(new Movie("Black Panther", "Black Panther is a 2018 American superhero film based on the Marvel Comics character of the same name. Produced by Marvel Studios and distributed", 8, thriller));

        usersRepository.save(new User("Mondia Media Group", "mondia", encoder.encode("mondia")) );

        System.out.println("Database Initialized");
    }
}
