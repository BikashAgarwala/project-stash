package com.bikash.stash.dto;

import com.bikash.stash.model.ItemType;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CreateItemRequest {
    private ItemType type;
    private String content;
    private String title;
}
