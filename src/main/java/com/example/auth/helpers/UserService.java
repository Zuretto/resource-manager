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
    EntityManager em;

    @Transactional
    public void createNewUser(String userName, String password, String email, String favoriteCharacter) {
        if (!isTheEmailAvailable(email) || !isTheUsernameAvailable(userName)) {
            throw new WebApplicationException(Response.Status.CONFLICT);
        }

        String passwordHash = DigestUtils.sha256Hex(password);
        User user = new User(userName, passwordHash, email, favoriteCharacter);

        em.persist(user);
    }

    @Transactional
    public User findUserByLoginAndPassword(String userName, String password) {
        String passwordHash = DigestUtils.sha256Hex(password);
        try {
            return em.createNamedQuery("Users.findByLoginAndPassword", User.class)
                    .setParameter("userName", userName)
                    .setParameter("passwordHash", passwordHash)
                    .getSingleResult();
        } catch (NoResultException exception) {
            throw new WebApplicationException(Response.Status.NOT_FOUND);
        }
    }

    @Transactional
    public void updateUsersPassword(String userName, String newPassword, String email, String favoriteCharacter) {
        User user = findUserByLoginEmailAndFavoriteCharacter(userName, email, favoriteCharacter);
        user.setPasswordHash(DigestUtils.sha256Hex(newPassword));
        em.persist(user);
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

    private boolean isTheUsernameAvailable(String userName) {
        return em.createNamedQuery("Users.findByLogin", User.class)
                .setParameter("userName", userName)
                .getResultList().size() == 0;
    }

    private boolean isTheEmailAvailable(String email) {
        return em.createNamedQuery("Users.findByEmail", User.class)
                .setParameter("email", email)
                .getResultList().size() == 0;
    }
}
