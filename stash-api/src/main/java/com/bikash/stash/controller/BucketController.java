package com.bikash.stash.controller;

import com.bikash.stash.dto.CreateBucketRequest;
import com.bikash.stash.model.Bucket;
import com.bikash.stash.service.BucketService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/buckets")
public class BucketController {

    private final BucketService bucketService;

    public BucketController(BucketService bucketService) {
        this.bucketService = bucketService;
    }

    @PostMapping
    public ResponseEntity<Bucket> createBucket(@RequestBody CreateBucketRequest request, @AuthenticationPrincipal UserDetails userDetails) {
        String userEmail = userDetails.getUsername();
        Bucket newBucket = new Bucket();
        newBucket.setBucketName(request.getBucketName());
        Bucket savedBucket = bucketService.createBucket(newBucket, userEmail);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedBucket);
    }

    @GetMapping
    public ResponseEntity<List<Bucket>> getBuckets(@AuthenticationPrincipal UserDetails userDetails) {
        String userEmail = userDetails.getUsername();
        List<Bucket> buckets = bucketService.getBucketsForUser(userEmail);
        return ResponseEntity.ok(buckets);
    }

    @PutMapping("/{bucketId}")
    public ResponseEntity<Bucket> updateBucket(@PathVariable Long bucketId, @RequestBody CreateBucketRequest request, @AuthenticationPrincipal UserDetails userDetails) {
        String userEmail = userDetails.getUsername();
        Bucket updatedBucket = bucketService.updateBucket(bucketId, request.getBucketName(), userEmail);
        return ResponseEntity.ok(updatedBucket);
    }

    @DeleteMapping("/{bucketId}")
    public ResponseEntity<Void> deleteBucket(@PathVariable Long bucketId, @AuthenticationPrincipal UserDetails userDetails) {
        String userEmail = userDetails.getUsername();
        bucketService.deleteBucket(bucketId, userEmail);
        return ResponseEntity.noContent().build();
    }
}