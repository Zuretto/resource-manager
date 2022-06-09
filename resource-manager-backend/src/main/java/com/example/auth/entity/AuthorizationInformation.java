package com.example.auth.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AuthorizationInformation {

    @JsonProperty("access_token")
    private String accessToken;

    @JsonProperty("token_type")
    private String tokenType = "JWT";

    @JsonProperty("expires_in")
    private Long expiresIn;

    public AuthorizationInformation withAccessToken(String accessToken) {
        this.accessToken = accessToken;
        return this;
    }

    public AuthorizationInformation withExpiresIn(Long expiresIn) {
        this.expiresIn = expiresIn;
        return this;
    }
}
