CREATE DATABASE IF NOT EXISTS `translator_app`;

USE `translator_app`;


#
# TABLE STRUCTURE FOR: positions
#

CREATE TABLE IF NOT EXISTS `positions` (
  `id` int(9) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO `positions` (`id`, `name`) VALUES (1, 'officer'), (2, 'manager'),(3, 'operator');


#
# TABLE STRUCTURE FOR: customers
#

CREATE TABLE IF NOT EXISTS `customers` (
  `id` int(9) unsigned NOT NULL AUTO_INCREMENT,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `position_id` int(9) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`position_id`) REFERENCES `positions`(id)
) AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO `customers` (`id`, `fname`, `lname`, `position_id`) VALUES (1, 'Dino', 'Fabrello', 1);
INSERT INTO `customers` (`id`, `fname`, `lname`, `position_id`) VALUES (2, 'Walter', 'Marangoni', 2);
INSERT INTO `customers` (`id`, `fname`, `lname`, `position_id`) VALUES (3, 'Angelo', 'Ottogialli', 3);


#
# TABLE STRUCTURE FOR: translations
#

CREATE TABLE IF NOT EXISTS `translations` (
  `token` varchar(255) NOT NULL,
  `translation` varchar(255) NOT NULL,
  PRIMARY KEY (`token`)
) DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

INSERT INTO `translations` (`token`, `translation`) VALUES ('officer', 'офицер');
INSERT INTO `translations` (`token`, `translation`) VALUES ('manager', 'менеджер');
INSERT INTO `translations` (`token`, `translation`) VALUES ('operator', 'оператор');