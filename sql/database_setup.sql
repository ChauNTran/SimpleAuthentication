CREATE DATABASE chaudb;
USE chaudb;
CREATE TABLE users (
	id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    email VARCHAR(255) NOT NULL,
    pw VARCHAR(255) NOT NULL,
    userName VARCHAR(255) NOT NULL
);