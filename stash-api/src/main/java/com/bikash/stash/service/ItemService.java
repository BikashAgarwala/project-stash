package com.bikash.stash.service;

import com.bikash.stash.exception.ResourceNotFoundException;
import com.bikash.stash.model.Item;
import com.bikash.stash.model.User;
import com.bikash.stash.repository.ItemRepository;
import com.bikash.stash.repository.UserRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class ItemService {

    private final ItemRepository itemRepository;
    private final UserRepository userRepository;

    public ItemService(ItemRepository itemRepository, UserRepository userRepository) {
        this.itemRepository = itemRepository;
        this.userRepository = userRepository;
    }

    public Item createItem(Item item, String userEmail) {
        User user = userRepository.findByEmail(userEmail)
                .orElseThrow(() -> new RuntimeException("User not found"));
        item.setUser(user);
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