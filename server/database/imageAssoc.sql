DROP TABLE IF EXISTS imagesAsscoc;
CREATE TABLE imagesAsscoc (
    imageId serial PRIMARY KEY NOT NULL,
    associationId INTEGER REFERENCES associations(associationId),
    image BYTEA
);