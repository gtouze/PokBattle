-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3308
-- Généré le :  jeu. 04 juin 2020 à 06:16
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
  PRIMARY KEY (`idCapacite`)
) ENGINE=InnoDB AUTO_INCREMENT=70 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `capacite`
--

INSERT INTO `capacite` (`idCapacite`, `nom`, `puissance`, `precisionCapacite`, `type`) VALUES
(64, 'Roue de feu', 50, 100, 'Feu'),
(66, 'Cannon à eau', 105, 45, 'Eau'),
(67, 'blast', 119, 31, 'Normal'),
(68, 'Brûlure', 100, 50, 'Feu'),
(69, 'Charge', 75, 75, 'Normal');

-- --------------------------------------------------------

--
-- Structure de la table `dresseur`
--

DROP TABLE IF EXISTS `dresseur`;
CREATE TABLE IF NOT EXISTS `dresseur` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(40) NOT NULL,
  `password` varchar(255) NOT NULL,
  `description` varchar(80) DEFAULT NULL,
  `sexe` varchar(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `dresseur`
--

INSERT INTO `dresseur` (`id`, `username`, `password`, `description`, `sexe`) VALUES
(10, 'testuser', '$2a$08$VwjiXmcjh7wNgmfjqtp3N.dAw3Po/q.vd1FaM2GMvkyQnvJ7z3DBC', NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `equipe`
--

DROP TABLE IF EXISTS `equipe`;
CREATE TABLE IF NOT EXISTS `equipe` (
  `idEquipe` int(11) NOT NULL AUTO_INCREMENT,
  `nomEquipe` varchar(40) NOT NULL,
  `dresseur` int(11) NOT NULL,
  `pokemon` int(11) NOT NULL,
  `capacite1` int(11) NOT NULL,
  `capacite2` int(11) DEFAULT NULL,
  PRIMARY KEY (`idEquipe`),
  KEY `FK_dresseur` (`dresseur`),
  KEY `FK_pokemon` (`pokemon`),
  KEY `FK_capacite1` (`capacite1`),
  KEY `FK_capacite2` (`capacite2`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `equipe`
--

INSERT INTO `equipe` (`idEquipe`, `nomEquipe`, `dresseur`, `pokemon`, `capacite1`, `capacite2`) VALUES
(11, 'PikaTeam', 10, 3, 66, NULL),
(12, 'PikaTeam', 10, 2, 67, NULL);

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
  PRIMARY KEY (`idPokemon`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Déchargement des données de la table `pokemon`
--

INSERT INTO `pokemon` (`idPokemon`, `nom`, `type`, `pv`, `atk`, `def`, `vit`) VALUES
(1, 'Wailord', 'Eau', 170, 90, 45, 60),
(2, 'Flotoutan', 'Eau', 75, 98, 63, 101),
(3, 'Tortank', 'Eau', 79, 84, 103, 78),
(4, 'Akwakwak', 'Eau', 80, 89, 79, 85),
(5, 'Aquali', 'Eau', 130, 88, 78, 65),
(6, 'Aligatueur', 'Eau', 85, 92, 92, 78),
(7, 'Arcanin', 'Feu', 90, 105, 80, 95),
(8, 'Galopa', 'Feu', 65, 90, 75, 105),
(9, 'Magmar', 'Feu', 65, 98, 71, 93),
(10, 'Pyroli', 'Feu', 65, 113, 85, 65),
(11, 'Typhlosion', 'Feu', 78, 97, 82, 100),
(12, 'Flamoutan', 'Feu', 75, 98, 63, 101),
(13, 'Bouldeneu', 'Plante', 100, 105, 88, 50),
(14, 'Meganium', 'Plante', 80, 83, 100, 80),
(15, 'Jungko', 'Plante', 70, 95, 75, 120),
(16, 'Phyllali', 'Plante', 65, 85, 98, 95),
(17, 'Majaspic', 'Plante', 75, 75, 95, 113),
(18, 'Feuiloutan', 'Plante', 75, 98, 63, 101);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `equipe`
--
ALTER TABLE `equipe`
  ADD CONSTRAINT `FK_capacite1` FOREIGN KEY (`capacite1`) REFERENCES `capacite` (`idCapacite`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_capacite2` FOREIGN KEY (`capacite2`) REFERENCES `capacite` (`idCapacite`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_dresseur` FOREIGN KEY (`dresseur`) REFERENCES `dresseur` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FK_pokemon` FOREIGN KEY (`pokemon`) REFERENCES `pokemon` (`idPokemon`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
