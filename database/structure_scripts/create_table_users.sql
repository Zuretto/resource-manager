CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(24) UNIQUE NOT NULL,
    password_hash VARCHAR(64) NOT NULL,
    email VARCHAR(64) UNIQUE NOT NULL,
    favorite_character VARCHAR(32) NOT NULL
);
