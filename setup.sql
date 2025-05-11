e-- Create schema
CREATE SCHEMA trojanbites;
USE trojanbites;

-- USER table
CREATE TABLE User (
    user_id VARCHAR(20) PRIMARY KEY,
    password VARCHAR(40)
);

-- RECIPE table
CREATE TABLE Recipe (
    recipe_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(20),
    title VARCHAR(100),
    tags JSON,
    votes INT DEFAULT 0,
    description TEXT,
    ingredients JSON,
    instructions JSON,
    FOREIGN KEY (user_id) REFERENCES User(user_id)
);

-- VOTING table
CREATE TABLE Voting (
    user_id VARCHAR(20),
    recipe_id INT,
    timestamp TIMESTAMP,
    PRIMARY KEY (user_id, recipe_id),
    FOREIGN KEY (user_id) REFERENCES User(user_id),
    FOREIGN KEY (recipe_id) REFERENCES Recipe(recipe_id)
);
