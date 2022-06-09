package com.example.auth.entity;


import javax.persistence.*;

@Entity
@NamedQueries({
        @NamedQuery(name = "Users.findByLoginAndPassword",
                query = "SELECT user FROM User user " +
                        "WHERE user.userName = :userName " +
                        "AND user.passwordHash = :passwordHash"),
        @NamedQuery(name = "Users.findByLogin",
                query = "SELECT user FROM User user " +
                        "WHERE user.userName = :userName"),
        @NamedQuery(name = "Users.findByEmail",
                query = "SELECT user FROM User user " +
                        "WHERE user.email = :email"),
        @NamedQuery(name = "Users.findByLoginEmailAndFavoriteCharacter",
                query = "SELECT user FROM User user " +
                        "WHERE user.userName = :userName " +
                        "AND user.email = :email " +
                        "AND user.favoriteCharacter = :favoriteCharacter")
})
@Table(name = "USERS")
public class User {

    @Id
    @GeneratedValue
    @Column(name = "ID")
    private Long id;

    @Column(name = "USER_NAME", length = 24, unique = true)
    private String userName;

    @Column(name = "PASSWORD_HASH", length = 64)
    private String passwordHash;

    @Column(name = "EMAIL", length = 64, unique = true)
    private String email;

    @Column(name = "FAVORITE_CHARACTER", length = 32)
    private String favoriteCharacter;

    public User() {}

    public User(String userName, String passwordHash, String email, String favoriteCharacter) {
        this.userName = userName;
        this.passwordHash = passwordHash;
        this.email = email;
        this.favoriteCharacter = favoriteCharacter;
    }

    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }

    public Long getId() {
        return id;
    }
}
