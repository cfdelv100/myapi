DROP DATABASE IF EXISTS `jobsdatabase`;
CREATE DATABASE `jobsdatabase`;
use `jobsdatabase`;

CREATE TABLE users(
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(255) NOT NULL
);

INSERT INTO users(name) VALUE ('John Doe'), ('Jane Smith');

SELECT * FROM users;

SELECT id FROM users;
