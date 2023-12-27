-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : mer. 27 déc. 2023 à 17:05
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `stock`
--

-- --------------------------------------------------------

--
-- Structure de la table `categorie`
--

CREATE TABLE `categorie` (
  `id_categorie` int(11) NOT NULL,
  `id_famille` int(11) NOT NULL,
  `nom_categorie` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categorie`
--

INSERT INTO `categorie` (`id_categorie`, `id_famille`, `nom_categorie`, `created_at`) VALUES
(7, 1, 'Basket', '2023-12-27 11:12:09'),
(8, 3, 'Ceinture', '2023-12-27 11:12:09'),
(9, 2, 'Sacs', '2023-12-27 11:12:09');

-- --------------------------------------------------------

--
-- Structure de la table `cible`
--

CREATE TABLE `cible` (
  `id_cible` int(11) NOT NULL,
  `nom_cible` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `cible`
--

INSERT INTO `cible` (`id_cible`, `nom_cible`, `created_at`) VALUES
(1, 'Enfant', '2023-12-27 11:11:43'),
(2, 'Homme', '2023-12-27 11:11:43'),
(3, 'Femme', '2023-12-27 11:11:43');

-- --------------------------------------------------------

--
-- Structure de la table `client`
--

CREATE TABLE `client` (
  `id` int(11) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `raison_sociale` varchar(255) NOT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `telephone` varchar(20) NOT NULL,
  `id_province` int(11) NOT NULL,
  `est_supprime` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `client`
--

INSERT INTO `client` (`id`, `nom`, `raison_sociale`, `adresse`, `email`, `telephone`, `id_province`, `est_supprime`) VALUES
(1, 'Client1', 'Client VIP', 'Av/Lula Q/ Delveaux N° 40', 'Client@gmail.com', '+24383223333', 10, 0);

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

CREATE TABLE `commande` (
  `id_commande` int(11) NOT NULL,
  `id_client` int(11) NOT NULL,
  `date_commande` timestamp NOT NULL DEFAULT current_timestamp(),
  `statut` varchar(200) NOT NULL,
  `quantite` decimal(10,0) NOT NULL,
  `Livraison` varchar(200) NOT NULL,
  `Paiement` varchar(200) NOT NULL,
  `retour` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `couleur`
--

CREATE TABLE `couleur` (
  `id_couleur` int(11) NOT NULL,
  `description` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `couleur`
--

INSERT INTO `couleur` (`id_couleur`, `description`, `created_at`) VALUES
(1, 'Noir', '2023-12-27 11:15:28'),
(2, 'Blanc', '2023-12-27 11:15:28'),
(3, 'Gris', '2023-12-27 11:15:28'),
(4, 'Bleu', '2023-12-27 11:15:28'),
(5, 'Rouge', '2023-12-27 11:15:28'),
(6, 'Vert', '2023-12-27 11:15:28'),
(7, 'Marron', '2023-12-27 11:15:28'),
(8, 'Rose pâle', '2023-12-27 11:15:28'),
(9, 'Bleu ciel', '2023-12-27 11:15:28'),
(10, 'Vert menthe', '2023-12-27 11:15:28'),
(11, 'Jaune vif', '2023-12-27 11:15:28'),
(12, 'Orange', '2023-12-27 11:15:28'),
(13, 'Rose vif', '2023-12-27 11:15:28'),
(14, 'Beige', '2023-12-27 11:15:28'),
(15, 'Camel', '2023-12-27 11:15:28'),
(16, 'Chocolat', '2023-12-27 11:15:28');

-- --------------------------------------------------------

--
-- Structure de la table `demande_commande`
--

CREATE TABLE `demande_commande` (
  `id_demande` int(11) NOT NULL,
  `id_client` int(11) NOT NULL,
  `date_demande` timestamp NOT NULL DEFAULT current_timestamp(),
  `statut_demande` varchar(200) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `quantite` decimal(10,0) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `emplacement`
--

CREATE TABLE `emplacement` (
  `id_emplacement` int(11) NOT NULL,
  `shop` int(11) DEFAULT NULL,
  `adresse` varchar(200) NOT NULL,
  `capacite` decimal(10,0) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `famille`
--

CREATE TABLE `famille` (
  `id_famille` int(11) NOT NULL,
  `nom` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `famille`
--

INSERT INTO `famille` (`id_famille`, `nom`, `created_at`) VALUES
(1, 'Chaussure', '2023-12-27 11:12:41'),
(2, 'Sac à main', '2023-12-27 11:12:41'),
(3, 'ceinture', '2023-12-27 11:12:41');

-- --------------------------------------------------------

--
-- Structure de la table `gestionstock`
--

CREATE TABLE `gestionstock` (
  `id_stock` int(11) NOT NULL,
  `id_variante` int(11) NOT NULL,
  `quantite` int(11) NOT NULL,
  `id_emplacement` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `image_produit`
--

CREATE TABLE `image_produit` (
  `id_image` int(11) NOT NULL,
  `id_varianteproduit` int(11) NOT NULL,
  `image` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `inventaire`
--

CREATE TABLE `inventaire` (
  `id_inventaire` int(11) NOT NULL,
  `id_produit` int(11) NOT NULL,
  `quantite` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `marque`
--

CREATE TABLE `marque` (
  `id_marque` int(11) NOT NULL,
  `nom` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `marque`
--

INSERT INTO `marque` (`id_marque`, `nom`, `created_at`) VALUES
(1, 'Zara', '2023-12-27 11:14:50'),
(2, 'Nike', '2023-12-27 11:14:50'),
(3, 'Adidas', '2023-12-27 11:14:50'),
(4, 'Mango', '2023-12-27 11:14:50');

-- --------------------------------------------------------

--
-- Structure de la table `matiere`
--

CREATE TABLE `matiere` (
  `id_matiere` int(11) NOT NULL,
  `nom_matiere` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `matiere`
--

INSERT INTO `matiere` (`id_matiere`, `nom_matiere`, `created_at`) VALUES
(1, 'Caoutchouc', '2023-12-27 11:16:16'),
(2, 'Cuir', '2023-12-27 11:16:16'),
(3, 'Plastiques', '2023-12-27 11:16:16'),
(4, 'Bois', '2023-12-27 11:16:16'),
(5, 'Cork', '2023-12-27 11:16:16');

-- --------------------------------------------------------

--
-- Structure de la table `mouvement_stock`
--

CREATE TABLE `mouvement_stock` (
  `id_mouvement` int(11) NOT NULL,
  `id_varianteproduit` int(11) NOT NULL,
  `date_mouvement` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_type_mouvement` int(11) NOT NULL,
  `quantite` decimal(10,0) NOT NULL,
  `id_utilisateur` int(11) DEFAULT NULL,
  `id_client` int(11) DEFAULT NULL,
  `id_fournisseur` int(11) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `pays`
--

CREATE TABLE `pays` (
  `id_pays` int(11) NOT NULL,
  `nom_pays` varchar(255) NOT NULL,
  `code_pays` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `pays`
--

INSERT INTO `pays` (`id_pays`, `nom_pays`, `code_pays`, `created_at`) VALUES
(1, 'États-Unis', 'US', '2023-12-27 11:13:27'),
(2, 'Royaume-Uni', 'UK', '2023-12-27 11:13:27'),
(3, 'Zone euro', 'EUR', '2023-12-27 11:13:27'),
(4, 'classe_A', 'CLA', '2023-12-27 11:13:27');

-- --------------------------------------------------------

--
-- Structure de la table `produit`
--

CREATE TABLE `produit` (
  `id_produit` int(11) NOT NULL,
  `nom_produit` varchar(200) NOT NULL,
  `id_categorie` int(11) NOT NULL,
  `id_marque` int(11) NOT NULL,
  `id_matiere` int(11) NOT NULL,
  `actif` varchar(200) DEFAULT NULL,
  `date_entrant` timestamp NOT NULL DEFAULT current_timestamp(),
  `date_MisAjour` datetime DEFAULT NULL,
  `id_cible` int(11) NOT NULL,
  `prix` decimal(10,0) NOT NULL,
  `code_variante` varchar(45) DEFAULT NULL,
  `est_supprime` tinyint(4) NOT NULL DEFAULT 0,
  `max_produit` int(11) DEFAULT NULL,
  `min_produit` int(11) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `produit`
--

INSERT INTO `produit` (`id_produit`, `nom_produit`, `id_categorie`, `id_marque`, `id_matiere`, `actif`, `date_entrant`, `date_MisAjour`, `id_cible`, `prix`, `code_variante`, `est_supprime`, `max_produit`, `min_produit`, `created_at`) VALUES
(19, 'Produit10', 7, 1, 2, NULL, '2023-12-23 23:00:00', '2023-12-24 00:00:00', 3, 100, 'P232', 0, NULL, NULL, '2023-12-27 11:06:36');

-- --------------------------------------------------------

--
-- Structure de la table `province`
--

CREATE TABLE `province` (
  `id_province` int(11) NOT NULL,
  `nom_province` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `province`
--

INSERT INTO `province` (`id_province`, `nom_province`) VALUES
(1, 'Bas-Uele'),
(2, 'Équateur'),
(3, 'Haut-Katanga'),
(4, 'Haut-Lomami'),
(5, 'Haut-Uele'),
(6, 'Ituri'),
(7, 'Kasaï'),
(8, 'Kasaï central'),
(9, 'Kasaï oriental'),
(10, 'Kinshasa'),
(11, 'Kongo-Central'),
(12, 'Kwango'),
(13, 'Kwilu'),
(14, 'Lomami'),
(15, 'Lualaba'),
(16, 'Mai-Ndombe'),
(17, 'Maniema'),
(18, 'Mongala'),
(19, 'Nord-Kivu'),
(20, 'Nord-Ubangi'),
(21, 'Sankuru'),
(22, 'Sud-Kivu'),
(23, 'Sud-Ubangi'),
(24, 'Tanganyika'),
(25, 'Tshopo'),
(26, 'Tshuapa');

-- --------------------------------------------------------

--
-- Structure de la table `taille`
--

CREATE TABLE `taille` (
  `id_taille` int(11) NOT NULL,
  `id_cible` int(11) NOT NULL,
  `id_pays` int(11) DEFAULT NULL,
  `id_famille` int(11) NOT NULL,
  `taille` int(11) NOT NULL,
  `position` tinyint(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `taille`
--

INSERT INTO `taille` (`id_taille`, `id_cible`, `id_pays`, `id_famille`, `taille`, `position`, `created_at`) VALUES
(18, 3, 3, 1, 35, 1, '2023-12-27 11:14:03'),
(19, 3, 3, 1, 36, 2, '2023-12-27 11:14:03'),
(20, 3, 3, 1, 37, 3, '2023-12-27 11:14:03'),
(21, 3, 3, 1, 38, 4, '2023-12-27 11:14:03'),
(22, 3, 3, 1, 39, 5, '2023-12-27 11:14:03'),
(23, 3, 3, 1, 40, 6, '2023-12-27 11:14:03'),
(24, 3, 3, 1, 41, 7, '2023-12-27 11:14:03'),
(25, 3, 3, 1, 42, 8, '2023-12-27 11:14:03'),
(26, 3, 3, 1, 43, 9, '2023-12-27 11:14:03'),
(27, 3, 3, 1, 44, 10, '2023-12-27 11:14:03'),
(28, 3, 3, 1, 45, 11, '2023-12-27 11:14:03'),
(29, 3, 3, 1, 46, 12, '2023-12-27 11:14:03'),
(30, 3, 2, 1, 3, 1, '2023-12-27 11:14:03'),
(31, 3, 2, 1, 4, 2, '2023-12-27 11:14:03'),
(32, 3, 2, 1, 5, 3, '2023-12-27 11:14:03'),
(33, 3, 2, 1, 6, 4, '2023-12-27 11:14:03'),
(34, 3, 2, 1, 7, 5, '2023-12-27 11:14:03'),
(35, 3, 2, 1, 8, 6, '2023-12-27 11:14:03'),
(36, 3, 2, 1, 9, 7, '2023-12-27 11:14:03'),
(37, 3, 2, 1, 10, 8, '2023-12-27 11:14:03'),
(38, 3, 2, 1, 11, 9, '2023-12-27 11:14:03'),
(39, 3, 2, 1, 12, 10, '2023-12-27 11:14:03'),
(40, 3, 2, 1, 13, 11, '2023-12-27 11:14:03'),
(41, 3, 4, 1, 35, 1, '2023-12-27 11:14:03'),
(42, 3, 4, 1, 35, 1, '2023-12-27 11:14:03'),
(43, 3, 4, 1, 36, 2, '2023-12-27 11:14:03'),
(44, 3, 4, 1, 37, 3, '2023-12-27 11:14:03'),
(45, 3, 4, 1, 38, 4, '2023-12-27 11:14:03'),
(46, 3, 4, 1, 39, 5, '2023-12-27 11:14:03'),
(47, 3, 4, 1, 40, 6, '2023-12-27 11:14:03'),
(48, 3, 4, 1, 41, 7, '2023-12-27 11:14:03'),
(49, 3, 4, 1, 42, 8, '2023-12-27 11:14:03'),
(50, 3, 4, 1, 43, 9, '2023-12-27 11:14:03'),
(51, 3, 4, 1, 44, 10, '2023-12-27 11:14:03'),
(52, 3, 4, 1, 45, 11, '2023-12-27 11:14:03'),
(53, 3, 4, 1, 46, 12, '2023-12-27 11:14:03');

-- --------------------------------------------------------

--
-- Structure de la table `taille_pays`
--

CREATE TABLE `taille_pays` (
  `id_taille_pays` int(11) NOT NULL,
  `id_taille` int(11) NOT NULL,
  `id_pays` int(11) NOT NULL,
  `id_couleur` int(11) DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `prix` int(11) DEFAULT NULL,
  `code_variant` varchar(200) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `taille_pays`
--

INSERT INTO `taille_pays` (`id_taille_pays`, `id_taille`, `id_pays`, `id_couleur`, `stock`, `prix`, `code_variant`, `created_at`) VALUES
(72, 18, 3, 1, 10, 90, 'P333', '2023-12-27 14:31:58'),
(73, 19, 3, 1, 5, 90, 'P333', '2023-12-27 14:31:58'),
(74, 23, 3, 1, 5, 90, 'P333', '2023-12-27 14:31:58');

-- --------------------------------------------------------

--
-- Structure de la table `type_mouvement`
--

CREATE TABLE `type_mouvement` (
  `id_type_mouvement` int(11) NOT NULL,
  `nom_type_mouvement` varchar(200) NOT NULL,
  `type_mouvement` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `type_mouvement`
--

INSERT INTO `type_mouvement` (`id_type_mouvement`, `nom_type_mouvement`, `type_mouvement`, `created_at`) VALUES
(1, 'Type1', 'Entrée', '2023-12-27 11:49:43'),
(2, 'Type2', 'Sortie', '2023-12-27 11:50:41'),
(3, 'Type3', 'Correction', '2023-12-27 11:51:03');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(200) DEFAULT NULL,
  `img` tinytext DEFAULT NULL,
  `password` varchar(200) NOT NULL,
  `isAdmin` int(8) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `varianteproduit`
--

CREATE TABLE `varianteproduit` (
  `id_varianteProduit` int(11) NOT NULL,
  `id_produit` int(11) NOT NULL,
  `id_taille` int(11) NOT NULL,
  `id_couleur` int(11) NOT NULL,
  `stock` int(11) NOT NULL,
  `code_variant` varchar(100) DEFAULT NULL,
  `img` longtext DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `est_supprime` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `varianteproduit`
--

INSERT INTO `varianteproduit` (`id_varianteProduit`, `id_produit`, `id_taille`, `id_couleur`, `stock`, `code_variant`, `img`, `created_at`, `est_supprime`) VALUES
(74, 19, 18, 1, 10, 'P333', '', '2023-12-27 14:31:58', 0),
(75, 19, 19, 1, 5, 'P333', '', '2023-12-27 14:31:58', 0),
(76, 19, 23, 1, 5, 'P333', '', '2023-12-27 14:31:58', 0);

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD PRIMARY KEY (`id_categorie`),
  ADD KEY `id_famille` (`id_famille`);

--
-- Index pour la table `cible`
--
ALTER TABLE `cible`
  ADD PRIMARY KEY (`id_cible`);

--
-- Index pour la table `client`
--
ALTER TABLE `client`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `commande`
--
ALTER TABLE `commande`
  ADD PRIMARY KEY (`id_commande`);

--
-- Index pour la table `couleur`
--
ALTER TABLE `couleur`
  ADD PRIMARY KEY (`id_couleur`);

--
-- Index pour la table `demande_commande`
--
ALTER TABLE `demande_commande`
  ADD PRIMARY KEY (`id_demande`);

--
-- Index pour la table `famille`
--
ALTER TABLE `famille`
  ADD PRIMARY KEY (`id_famille`);

--
-- Index pour la table `gestionstock`
--
ALTER TABLE `gestionstock`
  ADD KEY `id_variante` (`id_variante`);

--
-- Index pour la table `image_produit`
--
ALTER TABLE `image_produit`
  ADD PRIMARY KEY (`id_image`),
  ADD KEY `id_varianteproduit` (`id_varianteproduit`);

--
-- Index pour la table `marque`
--
ALTER TABLE `marque`
  ADD PRIMARY KEY (`id_marque`);

--
-- Index pour la table `matiere`
--
ALTER TABLE `matiere`
  ADD PRIMARY KEY (`id_matiere`);

--
-- Index pour la table `mouvement_stock`
--
ALTER TABLE `mouvement_stock`
  ADD PRIMARY KEY (`id_mouvement`),
  ADD KEY `id_varianteproduit` (`id_varianteproduit`),
  ADD KEY `id_type_mouvement` (`id_type_mouvement`);

--
-- Index pour la table `pays`
--
ALTER TABLE `pays`
  ADD PRIMARY KEY (`id_pays`);

--
-- Index pour la table `produit`
--
ALTER TABLE `produit`
  ADD PRIMARY KEY (`id_produit`),
  ADD KEY `id_categorie` (`id_categorie`),
  ADD KEY `id_marque` (`id_marque`),
  ADD KEY `id_matiere` (`id_matiere`),
  ADD KEY `id_cible` (`id_cible`);

--
-- Index pour la table `taille`
--
ALTER TABLE `taille`
  ADD PRIMARY KEY (`id_taille`),
  ADD KEY `id_cible` (`id_cible`),
  ADD KEY `id_pays` (`id_pays`),
  ADD KEY `id_famille` (`id_famille`);

--
-- Index pour la table `taille_pays`
--
ALTER TABLE `taille_pays`
  ADD PRIMARY KEY (`id_taille_pays`),
  ADD KEY `id_taille` (`id_taille`),
  ADD KEY `id_couleur` (`id_couleur`),
  ADD KEY `id_pays` (`id_pays`),
  ADD KEY `id_varianteproduit` (`code_variant`);

--
-- Index pour la table `type_mouvement`
--
ALTER TABLE `type_mouvement`
  ADD PRIMARY KEY (`id_type_mouvement`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `varianteproduit`
--
ALTER TABLE `varianteproduit`
  ADD PRIMARY KEY (`id_varianteProduit`),
  ADD KEY `id_produit` (`id_produit`),
  ADD KEY `id_couleur` (`id_couleur`),
  ADD KEY `id_taille` (`id_taille`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id_categorie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `cible`
--
ALTER TABLE `cible`
  MODIFY `id_cible` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `client`
--
ALTER TABLE `client`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `commande`
--
ALTER TABLE `commande`
  MODIFY `id_commande` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `couleur`
--
ALTER TABLE `couleur`
  MODIFY `id_couleur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `demande_commande`
--
ALTER TABLE `demande_commande`
  MODIFY `id_demande` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `famille`
--
ALTER TABLE `famille`
  MODIFY `id_famille` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `image_produit`
--
ALTER TABLE `image_produit`
  MODIFY `id_image` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT pour la table `marque`
--
ALTER TABLE `marque`
  MODIFY `id_marque` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `matiere`
--
ALTER TABLE `matiere`
  MODIFY `id_matiere` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `mouvement_stock`
--
ALTER TABLE `mouvement_stock`
  MODIFY `id_mouvement` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `pays`
--
ALTER TABLE `pays`
  MODIFY `id_pays` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `produit`
--
ALTER TABLE `produit`
  MODIFY `id_produit` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT pour la table `taille`
--
ALTER TABLE `taille`
  MODIFY `id_taille` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT pour la table `taille_pays`
--
ALTER TABLE `taille_pays`
  MODIFY `id_taille_pays` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT pour la table `type_mouvement`
--
ALTER TABLE `type_mouvement`
  MODIFY `id_type_mouvement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `varianteproduit`
--
ALTER TABLE `varianteproduit`
  MODIFY `id_varianteProduit` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=77;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `categorie`
--
ALTER TABLE `categorie`
  ADD CONSTRAINT `categorie_ibfk_1` FOREIGN KEY (`id_famille`) REFERENCES `famille` (`id_famille`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `gestionstock`
--
ALTER TABLE `gestionstock`
  ADD CONSTRAINT `gestionstock_ibfk_1` FOREIGN KEY (`id_variante`) REFERENCES `varianteproduit` (`id_varianteProduit`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `image_produit`
--
ALTER TABLE `image_produit`
  ADD CONSTRAINT `image_produit_ibfk_1` FOREIGN KEY (`id_varianteproduit`) REFERENCES `varianteproduit` (`id_varianteProduit`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `mouvement_stock`
--
ALTER TABLE `mouvement_stock`
  ADD CONSTRAINT `mouvement_stock_ibfk_1` FOREIGN KEY (`id_varianteproduit`) REFERENCES `varianteproduit` (`id_varianteProduit`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `mouvement_stock_ibfk_2` FOREIGN KEY (`id_type_mouvement`) REFERENCES `type_mouvement` (`id_type_mouvement`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `produit`
--
ALTER TABLE `produit`
  ADD CONSTRAINT `produit_ibfk_1` FOREIGN KEY (`id_categorie`) REFERENCES `categorie` (`id_categorie`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `produit_ibfk_2` FOREIGN KEY (`id_marque`) REFERENCES `marque` (`id_marque`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `produit_ibfk_3` FOREIGN KEY (`id_matiere`) REFERENCES `matiere` (`id_matiere`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `produit_ibfk_4` FOREIGN KEY (`id_cible`) REFERENCES `cible` (`id_cible`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `taille`
--
ALTER TABLE `taille`
  ADD CONSTRAINT `taille_ibfk_1` FOREIGN KEY (`id_cible`) REFERENCES `cible` (`id_cible`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `taille_ibfk_2` FOREIGN KEY (`id_pays`) REFERENCES `pays` (`id_pays`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `taille_ibfk_3` FOREIGN KEY (`id_famille`) REFERENCES `famille` (`id_famille`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `taille_pays`
--
ALTER TABLE `taille_pays`
  ADD CONSTRAINT `taille_pays_ibfk_1` FOREIGN KEY (`id_taille`) REFERENCES `taille` (`id_taille`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `taille_pays_ibfk_2` FOREIGN KEY (`id_couleur`) REFERENCES `couleur` (`id_couleur`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `taille_pays_ibfk_3` FOREIGN KEY (`id_pays`) REFERENCES `pays` (`id_pays`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `varianteproduit`
--
ALTER TABLE `varianteproduit`
  ADD CONSTRAINT `varianteproduit_ibfk_1` FOREIGN KEY (`id_produit`) REFERENCES `produit` (`id_produit`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `varianteproduit_ibfk_2` FOREIGN KEY (`id_couleur`) REFERENCES `couleur` (`id_couleur`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `varianteproduit_ibfk_3` FOREIGN KEY (`id_taille`) REFERENCES `taille` (`id_taille`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
