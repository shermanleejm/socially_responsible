CREATE DATABASE socially_responsible;
USE socially_responsible;
CREATE TABLE IF NOT EXISTS `companies` (
    `uen` VARCHAR(256) NOT NULL PRIMARY KEY,
    `name` VARCHAR(256) NOT NULL,
    `credit_score` DOUBLE
);
CREATE TABLE IF NOT EXISTS `expenditure` (
    `id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `amount` DOUBLE NOT NULL,
    `name` VARCHAR(1000) NOT NULL,
    `uen` VARCHAR(256),
    `timestamp` TIMESTAMP NOT NULL,
    FOREIGN KEY (`uen`) REFERENCES companies(`uen`)
);
CREATE TABLE IF NOT EXISTS `revenue` (
    `id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    `amount` DOUBLE NOT NULL,
    `name` VARCHAR(1000) NOT NULL,
    `uen` VARCHAR(256),
    `timestamp` TIMESTAMP NOT NULL,
    FOREIGN KEY (`uen`) REFERENCES companies(`uen`)
);