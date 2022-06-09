package com.example.auth.boundary;

import com.example.auth.entity.AuthorizationInformation;
import com.example.auth.entity.User;
import com.example.auth.helpers.UserService;
import com.example.auth.helpers.JWTService;


import javax.annotation.security.PermitAll;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;

@Path("/auth/api/v1")
public class AuthorizationResource {

    @Inject
    UserService userService;

    @Inject
    JWTService jwtService;

    @POST
    @Path("/user")
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.MEDIA_TYPE_WILDCARD)
    @PermitAll
    public Response register(@QueryParam("login") String login,
                             @QueryParam("password") String password,
                             @QueryParam("email") String email,
                             @QueryParam("favoriteCharacter") String favoriteCharacter) {
        userService.createNewUser(login, password, email, favoriteCharacter);
        return Response.ok().build();
    }

    @GET
    @Path("/user")
    @Produces(MediaType.APPLICATION_JSON)
    @PermitAll
    public Response login(@QueryParam("login") String login,
                          @QueryParam("password") String password) {

        User user = userService.findUserByLoginAndPassword(login, password);

        String encodedToken = jwtService.encodeToken(user.getId().toString());
        return Response.ok(new AuthorizationInformation()
                        .withExpiresIn(1200L)
                        .withAccessToken(encodedToken))
                .build();
    }

    @PATCH
    @Path("/user/password")
    @PermitAll
    @Produces(MediaType.APPLICATION_JSON)
    @Consumes(MediaType.MEDIA_TYPE_WILDCARD)
    public Response refreshPassword(@QueryParam("login") String login,
                                    @QueryParam("password") String newPassword,
                                    @QueryParam("email") String email,
                                    @QueryParam("favoriteCharacter") String favoriteCharacter) {

        userService.updateUsersPassword(login, newPassword, email, favoriteCharacter);

        return Response.ok().build();
    }

}
