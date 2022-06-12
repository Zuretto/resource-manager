package com.example.resource.boundary;

import com.example.resource.helper.ResourceService;
import io.quarkus.vertx.web.Body;
import org.eclipse.microprofile.jwt.JsonWebToken;
import org.eclipse.microprofile.openapi.annotations.enums.SecuritySchemeType;
import org.eclipse.microprofile.openapi.annotations.security.SecurityScheme;

import javax.annotation.security.PermitAll;
import javax.annotation.security.RolesAllowed;
import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;


@SecurityScheme(
        scheme = "bearer",
        type = SecuritySchemeType.HTTP,
        bearerFormat = "JWT"
)
@Path("/resource/api/v1")
public class ResourceResource {

    @Inject
    JsonWebToken jwt;

    @Inject
    ResourceService resourceService;

    @GET
    @Path("/resources/{userName}")
    @PermitAll
    @Produces(MediaType.APPLICATION_JSON)
    public Response getResourcesForUser(@PathParam("userName") String userName) {

        var resources = resourceService.findResourceMetadatasForUser(userName);

        return Response.ok(resources).build();
    }

    @GET
    @Path("/resources/{userName}/resource/{resourceName}")
    @PermitAll
    @Produces(MediaType.TEXT_PLAIN)
    public Response getContentOfResource(@PathParam("userName") String userName,
                                         @PathParam("resourceName") String resourceName) {

        var resourceContent = resourceService.findContentOfResourceForUsernameAndResourceName(userName, resourceName);

        return Response.ok(resourceContent).build();
    }

    @POST
    @Path("/resources/{userName}/resource/{resourceName}")
    @RolesAllowed("user")
    @Consumes(MediaType.MEDIA_TYPE_WILDCARD)
    @Produces(MediaType.APPLICATION_JSON)
    public Response createResource(@PathParam("resourceName") String nameOfNewResource,
                                   @PathParam("userName") String userNameFromPath,
                                   @QueryParam("imageUrl") String imageUrl) {

        String userName = jwt.getSubject();

        if (!userName.equals(userNameFromPath)) {
            throw new WebApplicationException(Response.Status.FORBIDDEN);
        }

        var resourceMetadata = resourceService.createNewResource(userName, nameOfNewResource, imageUrl);

        return Response.accepted(resourceMetadata).build();
    }

    @PUT
    @Path("/resources/{userName}/resource/{resourceName}")
    @RolesAllowed("user")
    @Consumes(MediaType.TEXT_PLAIN)
    @Produces(MediaType.APPLICATION_JSON)
    public Response uploadContentOfResource(@PathParam("resourceName") String nameOfResource,
                                            @PathParam("userName") String userNameFromPath,
                                            @Body byte[] documentContent) {

        String userName = jwt.getSubject();

        if (!userName.equals(userNameFromPath)) {
            throw new WebApplicationException(Response.Status.FORBIDDEN);
        }

        resourceService.uploadMetadataOfResource(userName, nameOfResource, documentContent);

        return Response.accepted().build();
    }

    @DELETE
    @Path("/resources/{userName}/resource/{resourceName}")
    @RolesAllowed("user")
    @Consumes(MediaType.WILDCARD)
    @Produces(MediaType.APPLICATION_JSON)
    public Response deleteResource(@PathParam("resourceName") String nameOfResource,
                                            @PathParam("userName") String userNameFromPath) {

        String userName = jwt.getSubject();

        if (!userName.equals(userNameFromPath)) {
            throw new WebApplicationException(Response.Status.FORBIDDEN);
        }

        resourceService.deleteResource(userName, nameOfResource);

        return Response.accepted().build();
    }

}
