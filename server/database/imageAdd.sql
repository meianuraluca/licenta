DROP TABLE IF EXISTS imagesAdd;
CREATE TABLE imagesAdd (
    imageId serial PRIMARY KEY NOT NULL,
    announceId INTEGER REFERENCES announces(announceId) NOT NULL,
    image BYTEA NOT NULL
);