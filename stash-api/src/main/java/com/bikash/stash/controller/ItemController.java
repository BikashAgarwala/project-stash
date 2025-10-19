package com.bikash.stash.controller;

import com.bikash.stash.dto.CreateItemRequest;
import com.bikash.stash.dto.MoveItemRequest;
import com.bikash.stash.model.Item;
import com.bikash.stash.service.ItemService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/items")
public class ItemController {

    private final ItemService itemService;

    public ItemController(ItemService itemService) {
        this.itemService = itemService;
    }

    @PostMapping
    public ResponseEntity<Item> createItem(
            @RequestBody CreateItemRequest request,
            @AuthenticationPrincipal UserDetails userDetails) {

        String userEmail = userDetails.getUsername();

        Item newItem = new Item();
        newItem.setType(request.getType());
        newItem.setContent(request.getContent());
        newItem.setTitle(request.getTitle());

        Item savedItem = itemService.createItem(newItem, request.getBucketId(), userEmail);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedItem);
    }

    @PatchMapping("/{itemId}/move")
    public ResponseEntity<Item> moveItem(@PathVariable Long itemId, @RequestBody MoveItemRequest request, @AuthenticationPrincipal UserDetails userDetails) {
        String userEmail = userDetails.getUsername();
        Item movedItem = itemService.moveItemToBucket(itemId, request.getTargetBucketId(), userEmail);
        return ResponseEntity.ok(movedItem);
    }

    @GetMapping
    public ResponseEntity<List<Item>> getItems(@AuthenticationPrincipal UserDetails userDetails) {
        String userEmail = userDetails.getUsername();
        List<Item> items = itemService.getItemsForUser(userEmail);
        return ResponseEntity.ok(items);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteItem(
            @PathVariable Long id,
            @AuthenticationPrincipal UserDetails userDetails) {

        String userEmail = userDetails.getUsername();
        itemService.deleteItem(id, userEmail);
        return ResponseEntity.noContent().build();
    }
}