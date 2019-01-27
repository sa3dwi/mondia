package mondia.movies.db;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import mondia.movies.model.Category;
import java.util.UUID;

@Repository
public interface CategoryRepository extends JpaRepository<Category, UUID>{
}