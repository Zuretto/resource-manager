CREATE TABLE resources
(
    id            SERIAL PRIMARY KEY,
    user_id       INTEGER REFERENCES users (id) NOT NULL,
    resource_name VARCHAR(32)                   NOT NULL,
    image_url     VARCHAR(256)                  NULL,
    content       BYTEA,

    UNIQUE (user_id, resource_name)
);

