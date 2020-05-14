-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3308
-- Généré le :  jeu. 09 avr. 2020 à 07:51
-- Version du serveur :  8.0.18
-- Version de PHP :  7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `pokbattle`
--

create database pokbattle;
use pokbattle;

-- --------------------------------------------------------

--
-- Structure de la table `capacite`
--

DROP TABLE IF EXISTS `capacite`;
CREATE TABLE IF NOT EXISTS `capacite` (
  `idCapacite` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(20) NOT NULL,
  `puissance` int(11) NOT NULL,
  `precisionCapacite` int(11) NOT NULL,
  `type` varchar(10) NOT NULL,
  `pokemon_fk` int(11) NOT NULL,
  PRIMARY KEY (`idCapacite`),
  KEY `capacite_ibfk_1` (`pokemon_fk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `dresseurs`
--
DROP TABLE IF EXISTS `dresseurs`;
CREATE TABLE IF NOT EXISTS `dresseurs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(40) NOT NULL,
  `password` varchar(150) NOT NULL,
  `description` varchar(80) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Structure de la table `pokemon`
--

DROP TABLE IF EXISTS `pokemon`;
CREATE TABLE IF NOT EXISTS `pokemon` (
  `idPokemon` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(20) NOT NULL,
  `type` varchar(10) NOT NULL,
  `pv` int(11) NOT NULL,
  `atk` int(11) NOT NULL,
  `def` int(11) NOT NULL,
  `vit` int(11) NOT NULL,
  `capacite1` int(11) NOT NULL,
  `capacite2` int(11) DEFAULT NULL,
  `dresseurs_fk` int(11) NOT NULL,
  PRIMARY KEY (`idPokemon`),
  KEY `dresseurs_fk` (`dresseurs_fk`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `capacite`
--
ALTER TABLE `capacite`
  ADD CONSTRAINT `capacite_ibfk_1` FOREIGN KEY (`pokemon_fk`) REFERENCES `pokemon` (`idPokemon`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `pokemon`
--
ALTER TABLE `pokemon`
  ADD CONSTRAINT `pokemon_ibfk_1` FOREIGN KEY (`dresseurs_fk`) REFERENCES `dresseurs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
