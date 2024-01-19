-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : ven. 19 jan. 2024 à 17:13
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
(9, 2, 'Sacs', '2023-12-27 11:12:09'),
(10, 1, 'Talon', '2024-01-02 08:06:14');

-- --------------------------------------------------------

--
-- Structure de la table `categorie_mouvement`
--

CREATE TABLE `categorie_mouvement` (
  `id_cat_mouvement` int(11) NOT NULL,
  `nom_categorie` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `categorie_mouvement`
--

INSERT INTO `categorie_mouvement` (`id_cat_mouvement`, `nom_categorie`) VALUES
(1, 'Entreé'),
(2, 'Sortie'),
(3, 'Correction(+)'),
(4, 'Correction(-)');

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
  `est_supprime` tinyint(4) NOT NULL DEFAULT 0,
  `avenue` varchar(100) NOT NULL,
  `quartier` varchar(100) NOT NULL,
  `commune` varchar(200) NOT NULL,
  `num` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `commande`
--

CREATE TABLE `commande` (
  `id_commande` int(11) NOT NULL,
  `id_client` int(11) NOT NULL,
  `date_commande` timestamp NOT NULL DEFAULT current_timestamp(),
  `statut` varchar(200) DEFAULT NULL,
  `id_livraison` int(11) NOT NULL DEFAULT 0,
  `id_paiement` int(11) NOT NULL DEFAULT 0,
  `user_cr` int(11) DEFAULT NULL,
  `id_shop` int(11) DEFAULT 1,
  `paye` int(11) NOT NULL DEFAULT 0,
  `retour` varchar(200) DEFAULT NULL,
  `est_supprime` tinyint(4) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `commande`
--

INSERT INTO `commande` (`id_commande`, `id_client`, `date_commande`, `statut`, `id_livraison`, `id_paiement`, `user_cr`, `id_shop`, `paye`, `retour`, `est_supprime`) VALUES
(15, 8, '2024-01-19 12:53:02', '1', 2, 0, 0, 1, 0, NULL, 0),
(16, 7, '2024-01-19 12:58:09', '1', 2, 0, 0, 1, 0, NULL, 0),
(17, 9, '2024-01-19 13:00:01', '2', 1, 0, 0, 1, 0, NULL, 0);

-- --------------------------------------------------------

--
-- Structure de la table `commune`
--

CREATE TABLE `commune` (
  `id_commune` int(11) NOT NULL,
  `nom_commune` varchar(200) NOT NULL,
  `id_province` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `commune`
--

INSERT INTO `commune` (`id_commune`, `nom_commune`, `id_province`) VALUES
(1, 'Bandalungwa', 10),
(2, 'Barumbu', 10),
(3, 'Bumbu', 10),
(4, 'Gombe', 10),
(5, 'Kalamu', 10),
(6, 'Kasa-vubu', 10),
(7, 'Kimbanseke', 10),
(8, 'Kinshasa', 10),
(9, 'Kintambo', 10),
(10, 'Kisenso', 10),
(11, 'Lemba', 10),
(12, 'Limete', 10),
(13, 'Lingwala', 10),
(14, 'Makala', 10),
(15, 'Maluku', 10),
(16, 'Masina', 10),
(17, 'Matete', 10),
(18, 'Mont-ngafula', 10),
(19, 'Ndjili', 10),
(20, 'Ngaba', 10),
(21, 'Ngaliema', 10),
(22, 'Ngiri-ngiri', 10),
(23, 'Nsele', 10),
(24, 'Selembao', 10);

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
-- Structure de la table `detail_commande`
--

CREATE TABLE `detail_commande` (
  `id_detail` int(11) NOT NULL,
  `id_commande` int(11) NOT NULL,
  `id_varianteProduit` int(11) NOT NULL,
  `id_client` int(11) DEFAULT NULL,
  `date_demande` timestamp NOT NULL DEFAULT current_timestamp(),
  `prix` decimal(10,0) NOT NULL,
  `statut_demande` varchar(200) DEFAULT NULL,
  `description` varchar(200) DEFAULT NULL,
  `id_taille` int(11) NOT NULL,
  `quantite` decimal(10,0) NOT NULL,
  `est_supprime` tinyint(4) NOT NULL DEFAULT 0,
  `user_cr` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `detail_livraison`
--

CREATE TABLE `detail_livraison` (
  `id_detail_livraison` int(11) NOT NULL,
  `id_commande` int(11) NOT NULL,
  `quantite_prix` int(11) NOT NULL,
  `id_varianteProduit` int(11) NOT NULL,
  `qte_livre` int(11) NOT NULL,
  `qte_commande` int(11) NOT NULL,
  `prix` decimal(10,0) NOT NULL,
  `package` int(11) DEFAULT NULL,
  `id_package` int(11) DEFAULT NULL,
  `id_livreur` int(11) NOT NULL DEFAULT 0,
  `id_detail_commande` int(11) DEFAULT NULL,
  `id_mouvement` int(11) DEFAULT NULL,
  `user_cr` smallint(6) DEFAULT NULL,
  `date_creation` timestamp NOT NULL DEFAULT current_timestamp(),
  `vu_livreur` tinyint(4) NOT NULL DEFAULT 0
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
-- Structure de la table `livraison`
--

CREATE TABLE `livraison` (
  `id_livraison` int(11) NOT NULL,
  `date_livre` date DEFAULT NULL,
  `user_cr` int(11) DEFAULT NULL,
  `date_cr` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `livreur`
--

CREATE TABLE `livreur` (
  `id_livreur` int(11) NOT NULL,
  `nom` varchar(50) NOT NULL,
  `prenom` varchar(50) NOT NULL,
  `adresse` varchar(100) DEFAULT NULL,
  `telephone` varchar(20) NOT NULL,
  `email` varchar(100) DEFAULT NULL,
  `est_supprime` tinyint(4) NOT NULL DEFAULT 0
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
  `id_varianteProduit` int(11) NOT NULL,
  `date_mouvement` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_type_mouvement` int(11) DEFAULT NULL,
  `quantite` decimal(10,0) NOT NULL,
  `id_user_cr` int(11) DEFAULT NULL,
  `id_client` int(11) DEFAULT NULL,
  `id_commande` int(11) DEFAULT NULL,
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
  `etatProduit` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Structure de la table `statut`
--

CREATE TABLE `statut` (
  `id_statut` int(11) NOT NULL,
  `nom_statut` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `statut`
--

INSERT INTO `statut` (`id_statut`, `nom_statut`) VALUES
(1, 'Validé'),
(2, 'Non-validé');

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

-- --------------------------------------------------------

--
-- Structure de la table `type_mouvement`
--

CREATE TABLE `type_mouvement` (
  `id_type_mouvement` int(11) NOT NULL,
  `type_mouvement` varchar(200) NOT NULL,
  `categorie_mouvement` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `type_mouvement`
--

INSERT INTO `type_mouvement` (`id_type_mouvement`, `type_mouvement`, `categorie_mouvement`, `created_at`) VALUES
(4, 'Vente', 2, '2023-12-30 12:11:29'),
(5, 'Retour', 1, '2023-12-30 12:16:51'),
(6, 'Echange(+)', 3, '2023-12-30 12:17:34'),
(7, 'Echange(-)', 4, '2023-12-30 12:18:00'),
(8, 'Adressage(+)', 3, '2023-12-30 12:18:51'),
(9, 'Adressage(-)', 4, '2023-12-30 12:19:05'),
(10, 'Réception', 1, '2023-12-30 12:19:24'),
(11, 'Avarie', 4, '2023-12-30 12:21:57'),
(12, 'Départ en livraison', 2, '2024-01-07 14:12:50'),
(13, 'Retour de livraison', 1, '2024-01-07 14:13:17');

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
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','secretaire','livreur','client') DEFAULT 'client'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`) VALUES
(4, 'Tite', 'titekilolo@gmail.com', '$2a$10$dnBFv505DYJOZWnusdzKOO/CEPr9006WkR.AwPHbLhII2q4muxW0C', 'admin'),
(5, 'Elie', 'elielokuli@gmail.com', '$2a$10$kvKnhLbwu6c0N3Oge66NwuWD39asid3zPn0DANro5ef04.CL/HCQy', 'livreur'),
(6, 'Heritier', 'heritier@gmail.com', '$2a$10$zoNUXn9HqixVKGLIMH/GK.o4JKGbc65z7IoUJUHEYz9QMECiTVeu.', 'livreur'),
(7, 'acha', 'achandambi@gmail.com', '$2a$10$9AKpD1fD7I7Sr4wGOXprMemZBsqUPGnsbenDhlPZKIr6iqCeD/ICq', NULL);

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

-- --------------------------------------------------------

--
-- Structure de la table `vente`
--

CREATE TABLE `vente` (
  `id_vente` int(11) NOT NULL,
  `date_vente` timestamp NOT NULL DEFAULT current_timestamp(),
  `id_client` int(11) DEFAULT NULL,
  `id_livreur` int(11) NOT NULL,
  `quantite` int(11) NOT NULL,
  `id_commande` int(11) NOT NULL,
  `id_detail_commande` int(11) DEFAULT NULL,
  `prix_unitaire` decimal(10,0) NOT NULL DEFAULT 0,
  `est_supprime` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
-- Index pour la table `categorie_mouvement`
--
ALTER TABLE `categorie_mouvement`
  ADD PRIMARY KEY (`id_cat_mouvement`);

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
-- Index pour la table `commune`
--
ALTER TABLE `commune`
  ADD PRIMARY KEY (`id_commune`);

--
-- Index pour la table `couleur`
--
ALTER TABLE `couleur`
  ADD PRIMARY KEY (`id_couleur`);

--
-- Index pour la table `detail_commande`
--
ALTER TABLE `detail_commande`
  ADD PRIMARY KEY (`id_detail`);

--
-- Index pour la table `detail_livraison`
--
ALTER TABLE `detail_livraison`
  ADD PRIMARY KEY (`id_detail_livraison`);

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
-- Index pour la table `livraison`
--
ALTER TABLE `livraison`
  ADD PRIMARY KEY (`id_livraison`);

--
-- Index pour la table `livreur`
--
ALTER TABLE `livreur`
  ADD PRIMARY KEY (`id_livreur`);

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
  ADD KEY `id_varianteproduit` (`id_varianteProduit`),
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
-- Index pour la table `statut`
--
ALTER TABLE `statut`
  ADD PRIMARY KEY (`id_statut`);

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
-- Index pour la table `users`
--
ALTER TABLE `users`
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
-- Index pour la table `vente`
--
ALTER TABLE `vente`
  ADD PRIMARY KEY (`id_vente`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `categorie`
--
ALTER TABLE `categorie`
  MODIFY `id_categorie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `categorie_mouvement`
--
ALTER TABLE `categorie_mouvement`
  MODIFY `id_cat_mouvement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `cible`
--
ALTER TABLE `cible`
  MODIFY `id_cible` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT pour la table `client`
--
ALTER TABLE `client`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `commande`
--
ALTER TABLE `commande`
  MODIFY `id_commande` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT pour la table `commune`
--
ALTER TABLE `commune`
  MODIFY `id_commune` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT pour la table `couleur`
--
ALTER TABLE `couleur`
  MODIFY `id_couleur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `detail_commande`
--
ALTER TABLE `detail_commande`
  MODIFY `id_detail` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT pour la table `detail_livraison`
--
ALTER TABLE `detail_livraison`
  MODIFY `id_detail_livraison` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;

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
-- AUTO_INCREMENT pour la table `livraison`
--
ALTER TABLE `livraison`
  MODIFY `id_livraison` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT pour la table `livreur`
--
ALTER TABLE `livreur`
  MODIFY `id_livreur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

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
  MODIFY `id_mouvement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=131;

--
-- AUTO_INCREMENT pour la table `pays`
--
ALTER TABLE `pays`
  MODIFY `id_pays` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `produit`
--
ALTER TABLE `produit`
  MODIFY `id_produit` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT pour la table `statut`
--
ALTER TABLE `statut`
  MODIFY `id_statut` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `taille`
--
ALTER TABLE `taille`
  MODIFY `id_taille` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT pour la table `taille_pays`
--
ALTER TABLE `taille_pays`
  MODIFY `id_taille_pays` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=234;

--
-- AUTO_INCREMENT pour la table `type_mouvement`
--
ALTER TABLE `type_mouvement`
  MODIFY `id_type_mouvement` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT pour la table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT pour la table `varianteproduit`
--
ALTER TABLE `varianteproduit`
  MODIFY `id_varianteProduit` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=236;

--
-- AUTO_INCREMENT pour la table `vente`
--
ALTER TABLE `vente`
  MODIFY `id_vente` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=121;

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
  ADD CONSTRAINT `mouvement_stock_ibfk_1` FOREIGN KEY (`id_varianteProduit`) REFERENCES `varianteproduit` (`id_varianteProduit`) ON DELETE CASCADE ON UPDATE CASCADE,
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
