DROP TABLE IF EXISTS announces;
CREATE TABLE announces (
    announceId serial PRIMARY KEY NOT NULL,
    userId INTEGER REFERENCES users(userId) NOT NULL,
    announceDate TIMESTAMP NOT NULL,
    title VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    announceDescription VARCHAR(500) NOT NULL,
    personContact VARCHAR(100) NOT NULL,
    announceEmail VARCHAR(100) NOT NULL,
    phone VARCHAR(100) NOT NULL,
    userLocation VARCHAR NOT NULL
);