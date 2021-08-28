DROP DATABASE IF EXISTS socially_responsible;

CREATE DATABASE socially_responsible;
USE socially_responsible;
CREATE TABLE IF NOT EXISTS `companies` (
    `uen` VARCHAR(256) NOT NULL PRIMARY KEY,
    `name` VARCHAR(256) NOT NULL,
    `password` VARCHAR(256) NOT NULL,
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
);