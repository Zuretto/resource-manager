package com.example.resource.entity;


import com.example.auth.entity.User;

import javax.persistence.*;

@Entity
@Table(name = "RESOURCES")
public class Resource {

    @Id
    @GeneratedValue
    @Column(name = "ID")
    private Long id;

    @ManyToOne(fetch = FetchType.EAGER)
    private User user;

    @Column(name = "RESOURCE_NAME", length = 32, nullable = false)
    private String resourceName;

    @Column(name = "IMAGE_URL", length = 256)
    private String imageUrl;

    @Column(name = "CONTENT")
    private byte[] content;

    public Resource() {}

    public Resource setUser(User user) {
        this.user = user;
        return this;
    }

    public Resource(User user, String resourceName, String imageUrl) {
        this.user = user;
        this.resourceName = resourceName;
        this.imageUrl = imageUrl;
    }

    public Long getId() {
        return id;
    }

    public User getUser() {
        return user;
    }

    public String getResourceName() {
        return resourceName;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public byte[] getContent() {
        return content;
    }

    public void setContent(byte[] content) {
        this.content = content;
    }
}
