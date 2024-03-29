DROP TABLE IF EXISTS associations;
CREATE TABLE associations (
    associationId serial PRIMARY KEY NOT NULL,
    associationName VARCHAR(500) NOT NULL,
    associationsDescription VARCHAR(3000),
    linkSite VARCHAR(500),
    logo BYTEA,
    motto VARCHAR(500),
    associationType VARCHAR(500),
    associationsEmail VARCHAR(500) NOT NULL,
    contactEmail VARCHAR(500),
    phone VARCHAR(500) NOT NULL,
    PASSWORD TEXT NOT NULL
);