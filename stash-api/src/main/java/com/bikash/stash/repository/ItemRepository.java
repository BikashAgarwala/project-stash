package com.bikash.stash.repository;
import com.bikash.stash.model.Item;
import com.bikash.stash.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByUserOrderByCreatedAtDesc(User user);
    Optional<Item> findByIdAndUser(Long id, User user);
}
