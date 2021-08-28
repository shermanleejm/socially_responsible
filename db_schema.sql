DROP DATABASE IF EXISTS socially_responsible;

CREATE DATABASE socially_responsible;
USE socially_responsible;
CREATE TABLE IF NOT EXISTS `companies` (
    `uen` VARCHAR(256) NOT NULL PRIMARY KEY,
    `name` VARCHAR(256) NOT NULL,
    `hashed_password` VARCHAR(256) NOT NULL,
    `salt` VARCHAR(1000) NOT NULL,
    `credit_score` DOUBLE
);
CREATE TABLE IF NOT EXISTS `expenditure` (
    `expenditure_id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `amount` DOUBLE NOT NULL,
    `name` VARCHAR(1000) NOT NULL,
    `uen` VARCHAR(256),
    `timestamp` DATE NOT NULL
);
CREATE TABLE IF NOT EXISTS `revenue` (
    `revenue_id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `amount` DOUBLE NOT NULL,
    `name` VARCHAR(1000) NOT NULL,
    `uen` VARCHAR(256),
    `timestamp` DATE NOT NULL
);
CREATE TABLE IF NOT EXISTS `loan` (
    `loan_id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `date` DATE NOT NULL,
    `provider` VARCHAR(256) NOT NULL,
    `amount` DOUBLE NOT NULL,
    `uen` VARCHAR(256),
    `status` VARCHAR(256) NOT NULL
);
CREATE TABLE IF NOT EXISTS `investors` (
    `username` VARCHAR(256) NOT NULL PRIMARY KEY,
    `hashed_password` VARCHAR(1000) NOT NULL,
    `salt` VARCHAR(1000) NOT NULL
);

INSERT INTO
expenditure(amount,name,uen,timestamp)
VALUES
(500,"rent","testuen",'2021-05-28'),
(600,"rent","testuen",'2021-05-29'),
(700,"rent","testuen",'2021-05-30'),
(100,"rent","testuen",'2021-05-31'),
(400,"rent","testuen",'2021-06-01'),
(300,"rent","testuen",'2021-06-02');

INSERT INTO
revenue(amount,name,uen,timestamp)
VALUES
(1000,"XRP","testuen",'2021-05-28'),
(1000,"XRP","testuen",'2021-05-29'),
(1200,"XRP","testuen",'2021-05-30'),
(1300,"XRP","testuen",'2021-05-31'),
(1500,"XRP","testuen",'2021-06-01'),
(1900,"XRP","testuen",'2021-06-02');