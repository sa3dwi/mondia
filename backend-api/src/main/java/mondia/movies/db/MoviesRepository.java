package mondia.movies.db;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import mondia.movies.model.Movie;
import java.util.UUID;

@Repository
public interface MoviesRepository extends JpaRepository<Movie, UUID>{
}