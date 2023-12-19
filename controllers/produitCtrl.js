const { db } = require("./../config/db.js");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.getProduitCount = (req, res) => {
    const q = "SELECT COUNT(*) AS total FROM produits WHERE est_supprime = 0";
  
    db.query(q ,(error, data)=>{
      if(error) res.status(500).send(error)
  
      return res.status(200).json(data);
  })
}


exports.getProduit = (req, res) => {

    const q = `SELECT *, matiere.nom AS nom_matiere, marque.nom AS nom_marque, emplacement.nom AS nom_emplacement, CASE
    WHEN chaussures.quantite_stock > 0 THEN 'Actif'
    ELSE 'Inactif'
    END AS statut FROM produits 
    INNER JOIN chaussures ON produits.id = chaussures.produit_id 
    INNER JOIN categories ON produits.categorie = categories.id
    INNER JOIN couleur ON produits.couleur = couleur.id
    INNER JOIN matiere ON produits.matiere = matiere.id
    INNER JOIN marque ON produits.marque = marque.id
    INNER JOIN emplacement ON chaussures.emplacement = emplacement.id
    WHERE produits.est_supprime = 0`
     
    db.query(q, (error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
};


exports.getProduitTotalAchats = (req, res) => {
    const q = `
      SELECT
        SUM(prix) AS achats_total
      FROM
        chaussures
    `;

    db.query(q, (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
    });
  };

exports.getProduitRecement = (req, res) => {
    const q = `
      SELECT
        *,
        CASE
          WHEN chaussures.quantite_stock > 0 THEN 'Actif'
          ELSE 'Inactif'
        END AS statut
      FROM
        produits
        INNER JOIN chaussures ON produits.id = chaussures.produit_id
        INNER JOIN categories ON produits.categorie = categories.id
        INNER JOIN couleur ON produits.couleur = couleur.id
      WHERE
        produits.est_supprime = 0
      ORDER BY chaussures.date_entree DESC
      LIMIT 10
    `;
  
    db.query(q, (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
    });
  };