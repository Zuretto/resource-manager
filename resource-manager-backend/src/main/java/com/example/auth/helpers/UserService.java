package com.example.auth.helpers;


import com.example.auth.entity.User;
import org.apache.commons.codec.digest.DigestUtils;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.transaction.Transactional;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;

@ApplicationScoped
public class UserService {

    @Inject
    UserManager userManager;

    public void createNewUser(String userName, String password, String email, String favoriteCharacter) {
        if (!userManager.isTheEmailAvailable(email) || !userManager.isTheUsernameAvailable(userName)) {
            throw new WebApplicationException(Response.Status.CONFLICT);
        }

        String passwordHash = DigestUtils.sha256Hex(password);
        userManager.createNewUser(userName, passwordHash, email, favoriteCharacter);

    }

    public User findUserByLoginAndPassword(String userName, String password) {
        String passwordHash = DigestUtils.sha256Hex(password);

        var userOptional = userManager.findUserByLoginAndPasswordHash(userName,
                passwordHash);

        if (userOptional.isEmpty()) {
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }

        return userOptional.get();
    }

    public void updateUsersPassword(String userName, String newPassword, String email, String favoriteCharacter) {
        String passwordHash = DigestUtils.sha256Hex(newPassword);

        userManager.updateUsersPassword(userName, passwordHash, email, favoriteCharacter);
    }

    @Transactional
    public User findUserByUsernameWithResources(String userName) {
        var userOptional = userManager.findUserByUsernameWithResources(userName);

        if (userOptional.isEmpty()) {
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }

        return userOptional.get();
    }




}
