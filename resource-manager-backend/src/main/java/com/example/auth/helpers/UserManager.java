package com.example.auth.helpers;

import com.example.auth.entity.User;
import com.example.resource.entity.Resource;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.transaction.Transactional;
import javax.ws.rs.WebApplicationException;
import javax.ws.rs.core.Response;
import java.util.Optional;

@ApplicationScoped
public class UserManager {

    @Inject
    EntityManager em;

    @Transactional
    public boolean isTheUsernameAvailable(String userName) {
        return em.createNamedQuery("Users.findByLogin", User.class)
                .setParameter("userName", userName)
                .getResultList().size() == 0;
    }

    @Transactional
    public boolean isTheEmailAvailable(String email) {
        return em.createNamedQuery("Users.findByEmail", User.class)
                .setParameter("email", email)
                .getResultList().size() == 0;
    }

    @Transactional
    public void createNewUser(String userName, String passwordHash, String email, String favoriteCharacter) {

        User user = new User(userName, passwordHash, email, favoriteCharacter);

        em.persist(user);
    }

    @Transactional
    public Optional<User> findUserByLoginAndPasswordHash(String userName, String passwordHash) {
        return em.createNamedQuery("Users.findByLoginAndPassword", User.class)
                .setParameter("userName", userName)
                .setParameter("passwordHash", passwordHash)
                .getResultList().stream().findFirst();
    }

    @Transactional
    public void updateUsersPassword(String userName, String passwordHash, String email, String favoriteCharacter) {
        User user = findUserByLoginEmailAndFavoriteCharacter(userName, email, favoriteCharacter);
        user.setPasswordHash(passwordHash);
        em.merge(user);
    }

    @Transactional
    public Optional<User> findUserByUsernameWithResources(String userName) {
        return em.createNamedQuery("Users.findByLoginWithResources", User.class)
                .setParameter("userName", userName)
                .getResultList().stream().findFirst();
    }

    @Transactional
    public Resource createNewResourceForUser(User user, String resourceName, String imageUrl) {
        Resource newResource = new Resource(user, resourceName, imageUrl);
        user.addResource(newResource);

        em.persist(newResource);

        return newResource;
    }

    @Transactional
    public void uploadContentOfResource(Resource resource, byte[] content) {
        resource.setContent(content);
        em.merge(resource);
    }

    private User findUserByLoginEmailAndFavoriteCharacter(String userName, String email, String favoriteCharacter) {
        try {
            return em.createNamedQuery("Users.findByLoginEmailAndFavoriteCharacter", User.class)
                    .setParameter("userName", userName)
                    .setParameter("email", email)
                    .setParameter("favoriteCharacter", favoriteCharacter)
                    .getSingleResult();
        } catch (NoResultException exception) {
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }
    }


}
