CREATE TABLE IF NOT EXISTS `category` (
    `id` BIGINT AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(255) NULL UNIQUE,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `genre` (
    `id` BIGINT AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(255) NULL UNIQUE,
    `category_id` BIGINT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`category_id`) REFERENCES `category`(`id`)
);

CREATE TABLE IF NOT EXISTS `book` (
    `id` BIGINT AUTO_INCREMENT NOT NULL,
    `title` VARCHAR(255) NOT NULL UNIQUE,
    `author` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `count` INT NULL,
    `price` FLOAT NOT NULL,
    `category_id` BIGINT,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`category_id`) REFERENCES `category`(`id`)
);

CREATE TABLE IF NOT EXISTS `role` (
    `id` BIGINT AUTO_INCREMENT NOT NULL,
    `name` VARCHAR(255) NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `person` (
    `id` BIGINT AUTO_INCREMENT NOT NULL,
    `first_name` VARCHAR(255) NULL,
    `last_name` VARCHAR(255) NULL,
    `email` VARCHAR(255) NULL UNIQUE,
    `password_hash` TEXT NULL,
    `balance` DOUBLE NULL,
    `role_id` BIGINT NULL,
    `refresh_token` TEXT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`role_id`) REFERENCES `role`(`id`)
);

CREATE TABLE IF NOT EXISTS `order` (
    `id` BIGINT AUTO_INCREMENT NOT NULL,
    `person_email` VARCHAR(255),
    `book_title` VARCHAR(255),
    PRIMARY KEY (`id`),
    FOREIGN KEY (`person_email`) REFERENCES person (`email`),
    FOREIGN KEY (`book_title`) REFERENCES book (`title`)
);

INSERT INTO `email`.`role` (`id`, `name`) VALUES ('1', 'User');
INSERT INTO `email`.`role` (`id`, `name`) VALUES ('2', 'Admin');