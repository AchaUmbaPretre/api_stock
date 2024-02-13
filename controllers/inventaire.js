 const { db } = require("./../config/db.js");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

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

exports.getInventaire = (req,res)=> {
    const {id} = req.params;

    const q = `SELECT varianteproduit.id_taille, SUM(stock) AS nombre_de_paires, taille.taille, pays.code_pays, MIN(taille.taille) AS taille_min, MAX(taille.taille) AS taille_max
    FROM varianteproduit
        INNER JOIN taille ON varianteproduit.id_taille = taille.id_taille
        INNER JOIN pays ON taille.id_pays = pays.id_pays
    WHERE varianteproduit.code_variant = ?
    GROUP BY varianteproduit.id_taille;
    `

    db.query(q, id, (error, data) => {
        if (error) return res.status(500).send(error);
    
        return res.status(200).json(data);
      });
}

exports.getInventaireOne = (req,res)=> {
    const {id} = req.params;

    const q = `SELECT SUM(stock) AS nombre_total_de_paires
                    FROM varianteproduit
                WHERE varianteproduit.code_variant = ?`

    db.query(q, id, (error, data) => {
        if (error) return res.status(500).send(error);
    
        return res.status(200).json(data);
      });
}
