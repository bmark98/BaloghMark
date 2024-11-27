CREATE DATABASE IF NOT EXISTS `nezok`;
USE `nezok`;
SET FOREIGN_KEY_CHECKS = ON;
CREATE TABLE IF NOT EXISTS `meccs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `datum` int(11) NOT NULL DEFAULT '0',
  `kezdes` int(11) NOT NULL DEFAULT '0',
  `belepo` int(11) NOT NULL DEFAULT '0',
  `tipus` varchar(45) text NOT NULL,
  text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `nezo` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `csaladi_nev` varchar(45) NOT NULL DEFAULT '',
  `uto_nev` varchar(45) NOT NULL DEFAULT '',
  `bejelentkezes` varchar(12) NOT NULL DEFAULT '',
  `jelszo` varchar(40) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;

CREATE TABLE IF NOT EXISTS `belepes` (
  `nezoid` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `meccsid` int(11) NOT NULL DEFAULT '0',
  `idopont` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=utf8;
