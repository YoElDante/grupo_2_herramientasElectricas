-- MySQL Script generated by MySQL Workbench
-- Fri Feb 16 19:23:22 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema electrotools_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema electrotools_db
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `electrotools_db` DEFAULT CHARACTER SET utf8mb4 ;
USE `electrotools_db` ;

-- -----------------------------------------------------
-- Table `electrotools_db`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `electrotools_db`.`users` ;

CREATE TABLE IF NOT EXISTS `electrotools_db`.`users` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  `firstname` VARCHAR(20) NOT NULL,
  `lastname` VARCHAR(20) NOT NULL,
  `birthday` DATE NOT NULL,
  `phone` VARCHAR(20) NOT NULL,
  `street` VARCHAR(20) NOT NULL,
  `city` VARCHAR(20) NOT NULL,
  `country` VARCHAR(20) NOT NULL,
  `zipcode` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `electrotools_db`.`accounts`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `electrotools_db`.`accounts` ;

CREATE TABLE IF NOT EXISTS `electrotools_db`.`accounts` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  `username` VARCHAR(25) NOT NULL UNIQUE,
  `email` VARCHAR(50) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `avatar` VARCHAR(255) NOT NULL,
  `user_id` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`, `user_id`),
  INDEX `fk_accounts_users1_idx` (`user_id` ASC) VISIBLE,
  CONSTRAINT `fk_accounts_users1`
    FOREIGN KEY (`user_id`)
    REFERENCES `electrotools_db`.`users` (`id`)
    ON DELETE CASCADE  -- Esta línea hace que tambien se borren los otros registros relacionados
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `electrotools_db`.`orders`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `electrotools_db`.`orders` ;

CREATE TABLE IF NOT EXISTS `electrotools_db`.`orders` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  `account_id` INT(10) UNSIGNED NOT NULL,
  `solddate` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `order_account_id` (`account_id` ASC) VISIBLE,
  CONSTRAINT `order_account_id`
    FOREIGN KEY (`account_id`)
    REFERENCES `electrotools_db`.`accounts` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `electrotools_db`.`productbrands`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `electrotools_db`.`productbrands` ;

CREATE TABLE IF NOT EXISTS `electrotools_db`.`productbrands` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  `name` VARCHAR(20) NOT NULL UNIQUE,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `electrotools_db`.`products`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `electrotools_db`.`products` ;

CREATE TABLE IF NOT EXISTS `electrotools_db`.`products` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  `name` VARCHAR(25) NOT NULL,
  `productbrand_id` INT(10) UNSIGNED NOT NULL,
  `model` VARCHAR(25) NOT NULL,
  `description` VARCHAR(100) NOT NULL,
  `price` DECIMAL(10,0) NOT NULL,
  `units` INT(10) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `product_productbrand_id` (`productbrand_id` ASC) VISIBLE,
  CONSTRAINT `product_productbrand_id`
    FOREIGN KEY (`productbrand_id`)
    REFERENCES `electrotools_db`.`productbrands` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `electrotools_db`.`orderdetails`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `electrotools_db`.`orderdetails` ;

CREATE TABLE IF NOT EXISTS `electrotools_db`.`orderdetails` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  `order_id` INT(10) UNSIGNED NOT NULL,
  `product_id` INT(10) UNSIGNED NOT NULL,
  `quantity` INT(10) UNSIGNED NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`),
  INDEX `orderdetail_order_id` (`order_id` ASC) VISIBLE,
  INDEX `orderdetail_product_id` (`product_id` ASC) VISIBLE,
  CONSTRAINT `orderdetail_order_id`
    FOREIGN KEY (`order_id`)
    REFERENCES `electrotools_db`.`orders` (`id`),
  CONSTRAINT `orderdetail_product_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `electrotools_db`.`products` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `electrotools_db`.`productdetails`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `electrotools_db`.`productdetails` ;

CREATE TABLE IF NOT EXISTS `electrotools_db`.`productdetails` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  `voltage` VARCHAR(10) NOT NULL,
  `frequency` VARCHAR(10) NOT NULL,
  `power` VARCHAR(10) NOT NULL,
  `extras` TEXT NOT NULL,
  `manual` VARCHAR(255) NULL DEFAULT NULL,
  `product_id` INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`, `product_id`),
  INDEX `fk_productdetails_products1_idx` (`product_id` ASC) VISIBLE,
  CONSTRAINT `fk_productdetails_products1`
    FOREIGN KEY (`product_id`)
    REFERENCES `electrotools_db`.`products` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4;


-- -----------------------------------------------------
-- Table `electrotools_db`.`productimages`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `electrotools_db`.`productimages` ;

CREATE TABLE IF NOT EXISTS `electrotools_db`.`productimages` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  `updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  `product_id` INT(10) UNSIGNED NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `productimages_product_id` (`product_id` ASC) VISIBLE,
  CONSTRAINT `productimages_product_id`
    FOREIGN KEY (`product_id`)
    REFERENCES `electrotools_db`.`products` (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 1
DEFAULT CHARACTER SET = utf8mb4;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
