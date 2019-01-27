package mondia.movies.db;

import mondia.movies.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;


@Repository
public interface UsersRepository extends JpaRepository<User, UUID>{
    Optional<User> findByUsername(String username);
    Boolean existsByUsername(String username);
}