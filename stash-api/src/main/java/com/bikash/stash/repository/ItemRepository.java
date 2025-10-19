package com.bikash.stash.repository;
import com.bikash.stash.model.Item;
import com.bikash.stash.model.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ItemRepository extends JpaRepository<Item, Long> {
    List<Item> findByUserOrderByCreatedAtDesc(User user);
    Optional<Item> findByIdAndUser(Long id, User user);

    @Transactional
    @Modifying
    @Query("UPDATE Item i SET i.bucket = NULL WHERE i.bucket.id = :bucketId")
    void setBucketToNullForItemsInBucket(Long bucketId);
}
