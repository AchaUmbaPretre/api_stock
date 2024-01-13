const { db } = require("./../config/db.js");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.getVente = (req, res) => {
    const q = `
    SELECT vente.*, users.username, varianteproduit.img, client.nom AS nom_client, marque.nom AS nom_marque, taille.taille AS pointure
        FROM vente
    INNER JOIN users ON vente.id_livreur = users.id
    INNER JOIN detail_commande ON vente.id_detail_commande = detail_commande.id_detail
    INNER JOIN varianteproduit ON varianteproduit.id_varianteProduit = detail_commande.id_varianteProduit
    INNER JOIN produit ON varianteproduit.id_produit = produit.id_produit
    INNER JOIN marque ON produit.id_marque = marque.id_marque
    INNER JOIN client ON detail_commande.id_client = client.id
    INNER JOIN taille ON varianteproduit.id_taille = taille.id_taille
        WHERE vente.est_supprime = 0 
    `;
     
    db.query(q, (error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
}

exports.postVente = (req, res) => {
    const StatutLivre = "UPDATE commande SET statut = 1, id_livraison = 2 WHERE id_commande = ?";
    const qStockeTaille = `SELECT stock FROM varianteproduit WHERE id_varianteProduit = ?`;
    const qUpdateStock = `UPDATE varianteproduit SET stock = ? WHERE id_varianteProduit = ?`;
    const qInsertMouvement = 'INSERT INTO mouvement_stock(`id_varianteProduit`, `id_type_mouvement`, `quantite`, `id_user_cr`, `id_client`, `id_fournisseur`, `description`) VALUES(?,?,?,?,?,?,?)';
    const q = 'INSERT INTO vente(`id_client`, `id_livreur`, `quantite`, `id_commande`, `id_detail_commande`,`prix_unitaire`) VALUES(?,?,?,?,?,?)';
  
    const values = [
        req.body.id_client,
        req.body.id_livreur,
        req.body.quantite,
        req.body.id_commande,
        req.body.id_detail_commande,
        req.body.prix_unitaire
    ]
    const valuesMouv = [
        req.body.id_varianteProduit,
        req.body.id_type_mouvement,
        req.body.quantite,
        req.body.id_user_cr,
        req.body.id_client,
        req.body.id_fournisseur,
        req.body.description
    ]

    db.query(q, values, (error, data) => {
      if (error) {
        res.status(500).json(error);
        console.log(error);
      } else {
        
        db.query(qStockeTaille, [req.body.id_varianteProduit], (error, stockTailleData) => {
            if (error) {
                res.status(500).json(error);
                console.log(error);
            } else {
                const stockTailleActuel = stockTailleData[0].stock

                let newStockTaille;

                if (parseInt(req.body.id_type_mouvement) === 13) {
                    newStockTaille = stockTailleActuel
                  } else if (parseInt(req.body.id_type_mouvement) === 12) {
                    newStockTaille = stockTailleActuel - parseInt(req.body.quantite);
                    if (newStockTaille > stockTailleActuel) {
                      res.status(400).json({ error: 'Quantité de stock insuffisante ou taille invalide.' });
                      return;
                    }
                    if (newStockTaille < 0) {
                      res.status(400).json({ error: 'Quantité de stock insuffisante.' });
                      return;
                    }
                } else{
                    newStockTaille = stockTailleActuel
                }

                db.query(qUpdateStock, [newStockTaille, req.body.id_varianteProduit], (error, updateData) => {
                    if (error) {
                      res.status(500).json(error);
                      console.log(error);
                    } else {
                      db.query(qInsertMouvement, valuesMouv, (error, mouvementData) => {
                        if (error) {
                          res.status(500).json(error);
                          console.log(error);
                        } else {
                            db.query(StatutLivre, [req.body.id_commande,], (error, updateData) =>{
                                if (error) {
                                    res.status(500).json(error);
                                    console.log(error);
                                  } else {
                                    res.json('Processus réussi');
                                  }
                            })
                        }
                      });
                    }
                  });
            }
        })
      }
    });
    
}

exports.deleteVente = (req, res) => {
    const {id} = req.params;
    const q = "DELETE FROM vente WHERE id_vente = ?"
  
    db.query(q, [id], (err, data)=>{
        if (err) return res.send(err);
      return res.json(data);
    })
}

exports.putVente = (req, res) => {
    const id = req.params.id;
    const q = "UPDATE vente SET `id_client`= ?, `id_livreur`= ?, `quantite`= ?, `id_commande`= ?, `prix_unitaire`= ? WHERE id_vente = ?"
    
    const values = [
        req.body.id_client,
        req.body.id_livreur,
        req.body.quantite,
        req.body.id_commande,
        req.body.prix_unitaire
    ]
  
    db.query(q, [...values,id], (err, data) => {
        if (err) return res.send(err);
        return res.json(data);
      });
}