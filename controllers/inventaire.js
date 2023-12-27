const { db } = require("./../config/db.js");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();


/* exports.getInventaire = (req, res) => {
    const q = `SELECT varianteproduit.*, produit.nom_produit, produit.date_entrant, taille.taille AS pointure,
                categorie.nom_categorie, marque.nom AS nom_marque, matiere.nom_matiere,
                famille.nom AS nom_famille, cible.nom_cible, image_produit.image,
                taille_pays.stock AS quantite, taille_pays.prix, pays.code_pays, couleur.description
              FROM varianteproduit
                INNER JOIN produit ON varianteproduit.id_produit = produit.id_produit
                INNER JOIN taille ON varianteproduit.id_taille = taille.id_taille
                INNER JOIN taille_pays ON taille.id_taille = taille_pays.id_taille
                INNER JOIN pays ON taille_pays.id_pays = pays.id_pays
                INNER JOIN couleur ON taille_pays.id_couleur = couleur.id_couleur
                INNER JOIN categorie ON produit.id_categorie = categorie.id_categorie 
                INNER JOIN marque ON produit.id_marque = marque.id_marque 
                INNER JOIN matiere ON produit.id_matiere = matiere.id_matiere
                INNER JOIN cible ON produit.id_cible = cible.id_cible
                INNER JOIN famille ON categorie.id_famille = famille.id_famille  
                INNER JOIN image_produit ON varianteproduit.id_varianteProduit = image_produit.id_varianteproduit`;
  
    db.query(q, (error, data) => {
      if (error) return res.status(500).send(error);
  
      // Calculer la quantité totale pour chaque variante de produit
      const inventaire = data.map((row) => {
        const quantiteTotale = data.reduce((total, item) => {
          if (item.id_varianteProduit === row.id_varianteProduit) {
            return total + item.quantite;
          }
          return total;
        }, 0);
  
        return {
          ...row,
          quantiteTotale,
        };
      });
  
      return res.status(200).json(inventaire);
    });
  }; */

/* exports.getInventaire = (req, res) => {
    const q = `SELECT varianteproduit.*, produit.id_produit, taille_pays.stock AS quantite
                FROM varianteproduit
                INNER JOIN produit ON varianteproduit.id_produit = produit.id_produit
                INNER JOIN taille_pays ON varianteproduit.id_varianteProduit = taille_pays.id_varianteProduit`;
  
    db.query(q, (error, data) => {
      if (error) return res.status(500).send(error);
  
      // Calculer la quantité totale pour chaque variante de produit
      const inventaire = data.reduce((acc, row) => {
        const existingItem = acc.find((item) => item.id_varianteProduit === row.id_varianteProduit);
  
        if (existingItem) {
          existingItem.quantite += row.quantite;
        } else {
          acc.push({
            id_inventaire: row.id_varianteProduit, // Utilisez l'id de la variante de produit comme id d'inventaire
            id_produit: row.id_produit,
            quantite: row.quantite,
          });
        }
  
        return acc;
      }, []);
  
      return res.status(200).json(inventaire);
    });
  } */;

/* exports.getInventaire = (req, res) => {
    const q = `SELECT varianteproduit.id_varianteProduit AS id_inventaire, produit.id_produit, SUM(taille_pays.stock) AS quantite
                FROM varianteproduit
                INNER JOIN produit ON varianteproduit.id_produit = produit.id_produit
                INNER JOIN taille_pays ON varianteproduit.id_taille = taille_pays.id_taille
                GROUP BY varianteproduit.id_varianteProduit, produit.id_produit`;
  
    db.query(q, (error, data) => {
      if (error) return res.status(500).send(error);
  
      return res.status(200).json(data);
    });
  };
 */

/* exports.getInventaire = (req, res) => {
    const q = `SELECT varianteproduit.*, produit.nom_produit, produit.date_entrant, taille.taille AS pointure,
                categorie.nom_categorie, marque.nom AS nom_marque, matiere.nom_matiere,
                famille.nom AS nom_famille, cible.nom_cible, image_produit.image,
                SUM(taille_pays.stock) AS quantite, taille_pays.prix, pays.code_pays, couleur.description
              FROM varianteproduit
                INNER JOIN produit ON varianteproduit.id_produit = produit.id_produit
                INNER JOIN taille ON varianteproduit.id_taille = taille.id_taille
                INNER JOIN taille_pays ON taille.id_taille = taille_pays.id_taille
                INNER JOIN pays ON taille_pays.id_pays = pays.id_pays
                INNER JOIN couleur ON taille_pays.id_couleur = couleur.id_couleur
                INNER JOIN categorie ON produit.id_categorie = categorie.id_categorie 
                INNER JOIN marque ON produit.id_marque = marque.id_marque 
                INNER JOIN matiere ON produit.id_matiere = matiere.id_matiere
                INNER JOIN cible ON produit.id_cible = cible.id_cible
                INNER JOIN famille ON categorie.id_famille = famille.id_famille  
                INNER JOIN image_produit ON varianteproduit.id_varianteProduit = image_produit.id_varianteproduit
              GROUP BY varianteproduit.id_varianteProduit, produit.id_produit`;
  
    db.query(q, (error, data) => {
      if (error) return res.status(500).send(error);
  
      return res.status(200).json(data);
    });
  }; */

exports.getInventaire = (req,res)=> {
    const {id} = req.params;

    const q = `SELECT taille_pays.id_taille, SUM(stock) AS nombre_de_paires, taille.taille, pays.code_pays, MIN(taille.taille) AS taille_min, MAX(taille.taille) AS taille_max
    FROM taille_pays
        INNER JOIN taille ON taille_pays.id_taille = taille.id_taille
        INNER JOIN pays ON taille_pays.id_pays = pays.id_pays
    WHERE taille_pays.code_variant = ?
    GROUP BY taille_pays.id_taille;
    `

    db.query(q, id, (error, data) => {
        if (error) return res.status(500).send(error);
    
        return res.status(200).json(data);
      });
}

exports.getInventaireOne = (req,res)=> {
    const {id} = req.params;

    const q = `SELECT SUM(stock) AS nombre_total_de_paires
                    FROM taille_pays
                WHERE taille_pays.code_variant = ?`

    db.query(q, id, (error, data) => {
        if (error) return res.status(500).send(error);
    
        return res.status(200).json(data);
      });
}