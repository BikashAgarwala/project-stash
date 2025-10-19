package com.bikash.stash.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MoveItemRequest {
    private Long targetBucketId;
}