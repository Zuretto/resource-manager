package com.example.resource.entity;


import com.fasterxml.jackson.annotation.JsonProperty;

public class ResourceMetadataDTO {

    @JsonProperty("resourceName")
    private String resourceName;

    @JsonProperty("resourceOwner")
    private String resourceOwner;

    @JsonProperty("imageUrl")
    private String imageUrl;

    public ResourceMetadataDTO(String resourceName, String resourceOwner, String imageUrl) {
        this.resourceName = resourceName;
        this.resourceOwner = resourceOwner;
        this.imageUrl = imageUrl;
    }
}
