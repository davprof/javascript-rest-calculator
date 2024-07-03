CREATE DATABASE IF NOT EXISTS calculator_db;

CREATE TABLE IF NOT EXISTS calculator_db.history (
    id INT AUTO_INCREMENT PRIMARY KEY,
    num1 FLOAT NOT NULL,
    num2 FLOAT NOT NULL,
    operation VARCHAR(10) NOT NULL,
    result FLOAT NOT NULL,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

TRUNCATE TABLE calculator_db.history;

SELECT * from calculator_db.history order by timestamp desc limit 10;