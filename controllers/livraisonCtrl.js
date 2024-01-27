const { db } = require("./../config/db.js");
const dotenv = require('dotenv');

dotenv.config();

exports.getLivraison = (req, res)=>{
    const q = `SELECT livraison.*, users.username FROM livraison
                  INNER JOIN users ON livraison.user_cr = users.id
              `;
   
  db.query(q, (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
  });
}

exports.getLivraisonOne = (req, res)=>{
    const {id} = req.params;
    const q = `SELECT * FROM livraison WHERE id_livraison = ?`;
   
  db.query(q,id, (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
  });
}

exports.postLivraison = (req, res) => {
    const q = 'INSERT INTO livraison(`date_livre`, `user_cr`) VALUES(?,?)';
    const values = [
        req.body.date_livre,
        req.body.user_cr,
    ]
    db.query(q, values, (error, data) => {
      console.log(error)
      if (error) {
        res.status(500).json(error);
        console.log(error);
      } else {
        res.json('Processus réussi');
      }
    });
  };

exports.deleteLivraison = (req, res) => {
    const {id} = req.params;
    const q = "DELETE FROM livraison WHERE id_livraison = ?"
  
    db.query(q, [id], (err, data)=>{
        if (err) return res.send(err);
      return res.json(data);
    })
}

//Detail livraison
exports.getLivraisonDetail = (req, res)=>{
  const q = `SELECT detail_livraison.*,varianteproduit.img, client.nom AS nom_client, client.id AS id_client, marque.nom AS nom_marque, users.username AS nom_livreur, taille.taille AS pointure FROM detail_livraison
              INNER JOIN varianteproduit ON detail_livraison.id_varianteProduit = varianteproduit.id_varianteProduit
              INNER JOIN commande ON detail_livraison.id_commande = commande.id_commande
              INNER JOIN client ON commande.id_client = client.id
              INNER JOIN produit ON varianteproduit.id_produit = produit.id_produit
              INNER JOIN marque ON produit.id_marque = marque.id_marque
              INNER JOIN users ON detail_livraison.id_livreur  = users.id
              INNER JOIN taille ON varianteproduit.id_taille = taille.id_taille
              GROUP BY commande.id_commande
              `;
  db.query(q, (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
  });
}

exports.getLivraisonDetailOne = (req, res)=>{
    const {id} = req.params;
    const q = `
            SELECT detail_livraison.*,varianteproduit.img, client.nom AS nom_client, marque.nom AS nom_marque, users.username AS nom_livreur, taille.taille AS pointure FROM detail_livraison
              INNER JOIN varianteproduit ON detail_livraison.id_varianteProduit = varianteproduit.id_varianteProduit
              INNER JOIN commande ON detail_livraison.id_commande = commande.id_commande
              INNER JOIN client ON commande.id_client = client.id
              INNER JOIN produit ON varianteproduit.id_produit = produit.id_produit
              INNER JOIN marque ON produit.id_marque = marque.id_marque
              INNER JOIN users ON detail_livraison.id_livreur  = users.id
              INNER JOIN taille ON varianteproduit.id_taille = taille.id_taille
            WHERE commande.id_commande = ?`;
   
  db.query(q,id, (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
  });
}

/* exports.postLivraisonDetail = (req, res) => {
  const getIdCommandeQuery = 'SELECT prix, quantite FROM detail_commande WHERE id_varianteProduit = ?';
  const qStockeTaille = `SELECT stock FROM varianteproduit WHERE id_varianteProduit = ?`;
  const qUpdateStock = `UPDATE varianteproduit SET stock = ? WHERE id_varianteProduit = ?`;
  const qInsertMouvement = 'INSERT INTO mouvement_stock(`id_varianteProduit`, `id_type_mouvement`, `quantite`, `id_user_cr`, `id_client`, `id_fournisseur`, `description`) VALUES(?,?,?,?,?,?,?)';


  const idVarianteProduit = req.body.id_varianteProduit;
  const quantiteLivre = req.body.qte_livre;

  db.query(getIdCommandeQuery, [idVarianteProduit], (error, results) => {
    if (error) {
      res.status(500).json(error);
      console.log(error);
    } else {
      if (results.length > 0) {
        const prixUnitaire = results[0].prix;
        const quantiteCommande = results[0].quantite;
        const prixTotal = (prixUnitaire / quantiteCommande) * quantiteLivre;

        const insertQuery = 'INSERT INTO detail_livraison (id_commande, quantite_prix, id_varianteProduit, qte_livre, qte_commande, prix, package, id_package,	id_livreur, id_detail_commande, user_cr) VALUES (?,?,?,?,?,?,?,?,?,?,?)';

        const values = [
          req.body.id_commande,
          req.body.quantite_prix,
          idVarianteProduit,
          quantiteLivre,
          req.body.qte_commande,
          prixTotal,
          req.body.package,
          req.body.id_package,
          req.body.id_livreur,
          req.body.id_detail_commande,
          req.body.user_cr
        ];

        db.query(insertQuery, values, (insertError, insertData) => {
          if (insertError) {
            res.status(500).json(insertError);
            console.log(insertError);
          } else {
            res.json('Processus réussi');
          }
        });
      } else {
        res.status(404).json('Prix ou quantité non trouvés pour l\'id_varianteProduit spécifié');
      }
    }
  });
}; */

exports.postLivraisonDetail = (req, res) => {
  const StatutLivre = "UPDATE commande SET statut = 1, id_livraison = 2 WHERE id_commande = ?";
  const getIdCommandeQuery = 'SELECT prix, quantite FROM detail_commande WHERE id_varianteProduit = ?';
  const qStockeTaille = `SELECT stock FROM varianteproduit WHERE id_varianteProduit = ?`;
  const qUpdateStock = `UPDATE varianteproduit SET stock = ? WHERE id_varianteProduit = ?`;
  const qInsertMouvement = 'INSERT INTO mouvement_stock(`id_varianteProduit`, `id_type_mouvement`, `quantite`, `id_user_cr`, `id_client`, `id_commande`,`id_fournisseur`, `description`) VALUES(?,?,?,?,?,?,?,?)';

  const valuesMouv = [
    req.body.id_varianteProduit,
    req.body.id_type_mouvement,
    req.body.quantite,
    req.body.id_user_cr,
    req.body.id_client,
    req.body.id_commande,
    req.body.id_fournisseur,
    req.body.description
]
  
  const idVarianteProduit = req.body.id_varianteProduit;
  const quantiteLivre = req.body.qte_livre;

  db.query(qStockeTaille,[idVarianteProduit],(error, stockTailleData) =>{
    if (error){
      res.status(500).json(error);
      console.log(error);
    }
    else{
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

    db.query(qUpdateStock, [newStockTaille, req.body.id_varianteProduit], (error, updateData) =>{
      if (error) {
        res.status(500).json(error);
        console.log(error);
      } else {
        db.query(qInsertMouvement, valuesMouv, (error, mouvementData) =>{
          if (error) {
            res.status(500).json(error);
            console.log(error);
          } else {
            db.query(getIdCommandeQuery, [idVarianteProduit], (error, results) =>{
                if (error) {
                    res.status(500).json(error);
                    console.log(error);
                  } else {
                    if (results.length > 0) {
                      const prixUnitaire = results[0].prix;
                      const quantiteCommande = results[0].quantite;
                      const prixTotal = (prixUnitaire / quantiteCommande) * quantiteLivre;
              
                      const insertQuery = 'INSERT INTO detail_livraison (id_commande, quantite_prix, id_varianteProduit, qte_livre, qte_commande, prix, package, id_package,	id_livreur, id_detail_commande, user_cr) VALUES (?,?,?,?,?,?,?,?,?,?,?)';
              
                      const values = [
                        req.body.id_commande,
                        req.body.quantite_prix,
                        idVarianteProduit,
                        quantiteLivre,
                        req.body.qte_commande,
                        prixTotal,
                        req.body.package,
                        req.body.id_package,
                        req.body.id_livreur,
                        req.body.id_detail_commande,
                        req.body.user_cr
                      ];
              
                      db.query(insertQuery, values, (insertError, insertData) => {
                        if (insertError) {
                          res.status(500).json(insertError);
                          console.log(insertError);
                        } else {
                          res.json('Processus réussi');
                        }
                      });
                    } else {
                      res.status(404).json('Prix ou quantité non trouvés pour l\'id_varianteProduit spécifié');
                    }
                  }
            })
        }
        })
      }
    })
    }
  })
};

exports.deleteLivraisonDetail = (req, res) => {
    const {id} = req.params;

    const q = "DELETE FROM detail_livraison WHERE id_detail_livraison = ?"
  
    db.query(q, [id], (err, data)=>{
        if (err) return res.send(err);
      return res.json(data);
    })
}

//Livraison prix
exports.getLivraisonDetailPrix = (req, res)=>{
  const {id} = req.params;
  const q = `
          SELECT prix FROM detail_livraison
          WHERE id_detail_livraison = ?`;
 
db.query(q,[id], (error, data) => {
    if (error) res.status(500).send(error);
    return res.status(200).json(data);
});
}

exports.putLivraisonDetailPrix = (req, res) => {
  const {id} = req.params;
  const {prix} = req.body;
  const q = "UPDATE detail_livraison SET `prix` = ? WHERE id_detail_livraison = ?";

  db.query(q, [prix,id], (err, data) => {
      if (err) return res.send(err);
      console.log(err)
      return res.json(data);
    });
  }



//livraison utilisateur
exports.getLivraisonUser = (req, res)=>{
  const {id} = req.params;

  const q = `SELECT detail_livraison.*,varianteproduit.img, client.nom, client.avenue, client.quartier, client.commune, client.num, client.telephone, client.id AS id_client, commune.nom_commune, province.nom_province FROM detail_livraison
              INNER JOIN varianteproduit ON detail_livraison.id_varianteProduit = varianteproduit.id_varianteProduit
              INNER JOIN detail_commande ON detail_livraison.id_detail_commande = detail_commande.id_detail
              INNER JOIN commande ON detail_livraison.id_commande = commande.id_commande 
              INNER JOIN client ON commande.id_client = client.id
              INNER JOIN commune ON client.commune = commune.id_commune
              INNER JOIN province ON client.id_province = province.id_province
            WHERE vu_livreur = 0 AND id_livreur = ? GROUP BY commande.id_commande
            `;
 
db.query(q,id, (error, data) => {
    if (error) res.status(500).send(error);
    return res.status(200).json(data);
});
}

exports.getLivraisonUserOne = (req, res)=>{
  const {id} = req.params;
  const idCommande = req.query.id_commande

  const q = `SELECT detail_livraison.*,varianteproduit.img, client.nom, client.avenue, client.quartier, client.commune, client.num, client.telephone, client.id AS id_client, commune.nom_commune, province.nom_province FROM detail_livraison 
              INNER JOIN varianteproduit ON detail_livraison.id_varianteProduit = varianteproduit.id_varianteProduit 
              INNER JOIN detail_commande ON detail_livraison.id_detail_commande = detail_commande.id_detail 
              INNER JOIN commande ON detail_livraison.id_commande = commande.id_commande
              INNER JOIN client ON commande.id_client = client.id
              INNER JOIN commune ON client.commune = commune.id_commune
              INNER JOIN province ON client.id_province = province.id_province
              WHERE vu_livreur = 0 AND id_livreur = ${id} AND commande.id_commande = ${idCommande};
            `;
 
db.query(q,(error, data) => {
    if (error) res.status(500).send(error);
    return res.status(200).json(data);
});
}

exports.getLivraisonUserDetail = (req, res)=>{
  const {id} = req.params;
  const q = `SELECT detail_livraison.*,varianteproduit.img, users.username, taille.taille, marque.nom FROM detail_livraison
              INNER JOIN varianteproduit ON detail_livraison.id_varianteProduit = varianteproduit.id_varianteProduit
              INNER JOIN users ON detail_livraison.user_cr = users.id
              INNER JOIN detail_commande ON detail_livraison.id_detail_commande = detail_commande.id_detail
              INNER JOIN taille ON varianteproduit.id_taille = taille.id_taille
              INNER JOIN produit ON varianteproduit.id_produit = produit.id_produit
              INNER JOIN marque ON produit.id_marque = marque.id_marque
            WHERE detail_livraison.id_varianteProduit = ?
            `;
 
db.query(q,id, (error, data) => {
    if (error) res.status(500).send(error);
    return res.status(200).json(data);
});
}

//Vu livreur
exports.putLivraisonVuLivreur = (req, res) => {
  const {id} = req.params;
  const q = "UPDATE detail_livraison SET vu_livreur = 1 WHERE id_commande = ?";

  db.query(q, [id], (err, data) => {
      if (err) return res.send(err);
      console.log(err)
      return res.json(data);
    });
}