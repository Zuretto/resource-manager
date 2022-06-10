package com.example.auth.helpers;

import io.smallrye.jwt.build.Jwt;

import javax.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class JWTService {

    public String encodeToken(String userName) {
        return Jwt.issuer("client")
                .subject(userName)
                .groups("user")
                .expiresAt(System.currentTimeMillis() + 1200L)
                .sign();
    }

}
