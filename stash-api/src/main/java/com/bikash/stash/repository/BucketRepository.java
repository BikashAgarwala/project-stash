package com.bikash.stash.repository;

import com.bikash.stash.model.Bucket;
import com.bikash.stash.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface BucketRepository extends JpaRepository<Bucket, Long> {
    List<Bucket> findByUser(User user);

    Optional<Bucket> findByIdAndUser(Long id, User user);
}