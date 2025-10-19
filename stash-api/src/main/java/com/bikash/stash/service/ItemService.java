package com.bikash.stash.service;

import com.bikash.stash.exception.ResourceNotFoundException;
import com.bikash.stash.model.Bucket;
import com.bikash.stash.model.Item;
import com.bikash.stash.model.User;
import com.bikash.stash.repository.BucketRepository;
import com.bikash.stash.repository.ItemRepository;
import com.bikash.stash.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ItemService {

    private final ItemRepository itemRepository;
    private final UserRepository userRepository;
    private final BucketRepository bucketRepository;

    public ItemService(ItemRepository itemRepository, UserRepository userRepository, BucketRepository bucketRepository) {
        this.itemRepository = itemRepository;
        this.userRepository = userRepository;
        this.bucketRepository = bucketRepository;
    }

    public Item createItem(Item item, Long bucketId, String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new RuntimeException("User not found"));
        item.setUser(user);

        if (bucketId != null) {
            Bucket bucket = bucketRepository.findByIdAndUser(bucketId, user)
                    .orElseThrow(() -> new RuntimeException("Bucket not found or permission denied"));
            item.setBucket(bucket);
        }
        return itemRepository.save(item);
    }

    public Item moveItemToBucket(Long itemId, Long targetBucketId, String userEmail) {
        User user = userRepository.findByEmail(userEmail).orElseThrow(() -> new RuntimeException("User not found"));
        Item item = itemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Item not found"));

        if (!item.getUser().getId().equals(user.getId())) {
            throw new RuntimeException("Permission denied to move this item");
        }

        Bucket targetBucket = null;
        if (targetBucketId != null) {
            targetBucket = bucketRepository.findByIdAndUser(targetBucketId, user)
                    .orElseThrow(() -> new RuntimeException("Target bucket not found or permission denied"));
        }

        item.setBucket(targetBucket);
        return itemRepository.save(item);
    }

    public List<Item> getItemsForUser(String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return itemRepository.findByUserOrderByCreatedAtDesc(user);
    }

    public void deleteItem(Long itemId, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + userEmail));

        Item item = itemRepository.findByIdAndUser(itemId, user)
                .orElseThrow(() -> new ResourceNotFoundException("Item not found with id: " + itemId + " for the current user"));

        itemRepository.delete(item);
    }
}