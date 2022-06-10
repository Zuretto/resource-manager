package com.example.resource.helper;

import com.example.auth.helpers.UserManager;
import com.example.auth.helpers.UserService;
import com.example.resource.entity.Resource;
import com.example.resource.entity.ResourceMetadataDTO;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.stream.Collectors;

@ApplicationScoped
public class ResourceService {

    @Inject
    UserService userService;

    @Inject
    UserManager userManager;

    public List<ResourceMetadataDTO> findResourceMetadatasForUser(String userName) {
        var resources = userService.findUserByUsernameWithResources(userName).getResources();

        return resources
                .stream().map(
                        resource -> new ResourceMetadataDTO(
                                resource.getResourceName(),
                                resource.getUser().getUserName(),
                                resource.getImageUrl()
                        )).collect(Collectors.toList());
    }

    public byte[] findContentOfResourceForUsernameAndResourceName(String userName, String resourceName) {
        var optionalResource = userService.findUserByUsernameWithResources(userName)
                .getResources().stream().filter(resource -> resource.getResourceName().equals(resourceName))
                .findFirst();

        if (optionalResource.isEmpty()) {
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }

        return optionalResource.get().getContent();
    }

    public ResourceMetadataDTO createNewResource(String userName, String nameOfNewResource, String imageUrl) {
        var user = userService.findUserByUsernameWithResources(userName);

        if (user.getResources().stream().anyMatch(resource -> resource.getResourceName().equals(nameOfNewResource))) {
            throw new WebApplicationException(Response.Status.CONFLICT);
        }

        Resource newResource = userManager.createNewResourceForUser(user, nameOfNewResource, imageUrl);

        return new ResourceMetadataDTO(newResource.getResourceName(),
                newResource.getUser().getUserName(),
                newResource.getImageUrl());
    }

    public void uploadMetadataOfResource(String userName, String nameOfResource, byte[] content) {
        var user = userService.findUserByUsernameWithResources(userName);

        var resourceOptional = user.getResources().stream().filter(resource -> resource.getResourceName().equals(nameOfResource)).findFirst();
        if (resourceOptional.isEmpty()) {
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }

        userManager.uploadContentOfResource(resourceOptional.get(), content);
    }


}
