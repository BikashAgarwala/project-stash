package com.bikash.stash.service;
import com.bikash.stash.model.Bucket;
import com.bikash.stash.model.User;
import com.bikash.stash.repository.BucketRepository;
import com.bikash.stash.repository.ItemRepository;
import com.bikash.stash.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class BucketService {

    private final BucketRepository bucketRepository;
    private final UserRepository userRepository;
    private final ItemRepository itemRepository;

    public BucketService(BucketRepository bucketRepository, UserRepository userRepository, ItemRepository itemRepository) {
        this.bucketRepository = bucketRepository;
        this.userRepository = userRepository;
        this.itemRepository = itemRepository;
    }

    public Bucket createBucket(Bucket bucket, String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new RuntimeException("User not found"));
        bucket.setUser(user);
        return bucketRepository.save(bucket);
    }

    public List<Bucket> getBucketsForUser(String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new RuntimeException("User not found"));
        return bucketRepository.findByUser(user);
    }

    public Bucket updateBucket(Long bucketId, String newName, String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new RuntimeException("User not found"));
        Bucket bucket = bucketRepository.findByIdAndUser(bucketId, user)
                .orElseThrow(() -> new RuntimeException("Bucket not found or you do not have permission to update it"));

        bucket.setBucketName(newName);
        return bucketRepository.save(bucket);
    }

    public void deleteBucket(Long bucketId, String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new RuntimeException("User not found"));
        Bucket bucket = bucketRepository.findByIdAndUser(bucketId, user)
                .orElseThrow(() -> new RuntimeException("Bucket not found or you do not have permission to delete it"));

        itemRepository.setBucketToNullForItemsInBucket(bucketId);

        bucketRepository.delete(bucket);
    }
}