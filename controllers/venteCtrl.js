const { db } = require("./../config/db.js");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.getVente = (req, res) => {
    const q = `
    SELECT vente.*, users.username, varianteproduit.img, client.nom AS nom_client, client.telephone, marque.nom AS nom_marque, taille.taille AS pointure,
    SUM(vente.quantite) AS total_varianteproduit,
    SUM(vente.prix_unitaire) AS total_prix_vente
FROM vente
INNER JOIN users ON vente.id_livreur = users.id
INNER JOIN detail_commande ON vente.id_detail_commande = detail_commande.id_detail
INNER JOIN varianteproduit ON varianteproduit.id_varianteProduit = detail_commande.id_varianteProduit
INNER JOIN produit ON varianteproduit.id_produit = produit.id_produit
INNER JOIN marque ON produit.id_marque = marque.id_marque
INNER JOIN commande ON vente.id_commande = commande.id_commande
INNER JOIN client ON commande.id_client = client.id
INNER JOIN taille ON varianteproduit.id_taille = taille.id_taille
WHERE vente.est_supprime = 0
GROUP BY commande.id_commande
    `;
     
    db.query(q, (error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
}

exports.getVenteCount = (req, res) => {
  const q = "SELECT COUNT(*) AS total FROM vente WHERE est_supprime = 0";

  db.query(q ,(error, data)=>{
    if(error) res.status(500).send(error)

    return res.status(200).json(data);
})
}

exports.getVenteOne = (req, res) => {
  const {id} = req.params;
  const q = `
  SELECT vente.*, users.username, varianteproduit.img, client.nom AS nom_client, marque.nom AS nom_marque, taille.taille AS pointure
      FROM vente
  INNER JOIN users ON vente.id_livreur = users.id
  INNER JOIN detail_commande ON vente.id_detail_commande = detail_commande.id_detail
  INNER JOIN varianteproduit ON varianteproduit.id_varianteProduit = detail_commande.id_varianteProduit
  INNER JOIN produit ON varianteproduit.id_produit = produit.id_produit
  INNER JOIN marque ON produit.id_marque = marque.id_marque
  INNER JOIN commande ON vente.id_commande = commande.id_commande
  INNER JOIN client ON commande.id_client = client.id
  INNER JOIN taille ON varianteproduit.id_taille = taille.id_taille
      WHERE vente.est_supprime = 0 AND commande.id_commande = ${id}
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
    const qLivraison = "UPDATE detail_livraison SET vu_livreur = 1 WHERE id_varianteProduit = ?";
    const qInsertMouvement = 'INSERT INTO mouvement_stock(`id_varianteProduit`, `id_type_mouvement`, `quantite`, `id_user_cr`, `id_client`, `id_fournisseur`, `description`) VALUES(?)';
    const qUpdateMouv = `UPDATE mouvement_stock SET id_type_mouvement = ? WHERE id_varianteProduit = ?`;
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
        db.query(qUpdateMouv, [req.body.id_type_mouvement,req.body.id_varianteProduit], (error, mouvementData) => {
          if (error) {
            res.status(500).json(error);
            console.log(error);
          } else {
              db.query(StatutLivre, [req.body.id_commande,], (error, updateData) =>{
                  if (error) {
                      res.status(500).json(error);
                      console.log(error);
                    } else {

                      db.query(qStockeTaille,[req.body.id_varianteProduit],(error, stockTailleData) =>{
                        if (error){
                          res.status(500).json(error);
                          console.log(error);
                        }
                        else{
                          const stockTailleActuel = stockTailleData[0].stock
                          let newStockTaille;

                          if (parseInt(req.body.id_type_mouvement) === 4) {
                            newStockTaille = stockTailleActuel
                          } else if (parseInt(req.body.id_type_mouvement) === 5){
                            newStockTaille = stockTailleActuel + parseInt(req.body.quantite)
                          }
                          else{
                            newStockTaille = stockTailleActuel
                        }
                        db.query(qUpdateStock, [newStockTaille, req.body.id_varianteProduit], (error, updateData) =>{
                          if (error) {
                            res.status(500).json(error);
                            console.log(error);
                          }else{
                            db.query(qLivraison, [req.body.id_varianteProduit], (error, updateData) =>{
                              if (error) {
                                res.status(500).json(error);
                                console.log(error);
                              }else{
                                res.json('Processus réussi');
                              }
                            })
                          }
                        })
                        }
                      })
                    }
              })
          }
        });
      }
    });
    
}

exports.postVenteRetour = (req, res) => {
  const StatutLivre = "UPDATE commande SET statut = 1, id_livraison = 2 WHERE id_commande = ?";
  const qStockeTaille = `SELECT stock FROM varianteproduit WHERE id_varianteProduit = ?`;
  const qUpdateStock = `UPDATE varianteproduit SET stock = ? WHERE id_varianteProduit = ?`;
  const qLivraison = "UPDATE detail_livraison SET vu_livreur = 1 WHERE id_varianteProduit = ?";
  const qInsertMouvement = 'INSERT INTO mouvement_stock(`id_varianteProduit`, `id_type_mouvement`, `quantite`, `id_user_cr`, `id_client`,`id_commande`, `id_fournisseur`, `description`) VALUES(?)';

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
  
  db.query(StatutLivre, [req.body.id_commande,], (error, updateData) =>{
    if (error) {
      res.status(500).json(error);
      console.log(error);
    } else{
      db.query(qStockeTaille,[req.body.id_varianteProduit],(error, stockTailleData) =>{
        if (error){
          res.status(500).json(error);
          console.log(error);
        }
        else{
          console.log( stockTailleData[0].stock)
          const stockTailleActuel = stockTailleData[0].stock
          let newStockTaille;

          if (parseInt(req.body.id_type_mouvement) === 4) {
            newStockTaille = stockTailleActuel
          } else if (parseInt(req.body.id_type_mouvement) === 5){
            newStockTaille = stockTailleActuel + parseInt(req.body.quantite)
            console.log(newStockTaille)
          }
          else{
            newStockTaille = stockTailleActuel
        }
        db.query(qUpdateStock, [newStockTaille, req.body.id_varianteProduit], (error, updateData) =>{
          if (error) {
            res.status(500).json(error);
            console.log(error);
          }else{
            db.query(qLivraison, [req.body.id_varianteProduit], (error, updateData) =>{
              if (error) {
                res.status(500).json(error);
                console.log(error);
              }else{
                db.query(qInsertMouvement, [valuesMouv], (error, updateData) =>{
                  if(error){
                    res.status(500).json(error);
                    console.log(error);
                  }else{
                    res.json('Processus réussi');
                  }
                })
              }
            })
          }
        })
        }
      })
    }
  })
  
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


//rapport de vente
exports.getRapportVente = (req, res) => {
  const { start_date, end_date } = req.query;

  const q = `
    SELECT
      m.id_marque,
      SUM(v.quantite) AS quantite_vendue,
      SUM(v.prix_unitaire * v.quantite) AS montant_vendu,
      vp.stock AS quantite_en_stock,
      vp.img,
      taille.taille,
      m.nom AS nom_marque,
      categorie.nom_categorie
    FROM vente v
    INNER JOIN varianteproduit vp ON v.id_detail_commande = vp.id_varianteProduit
    INNER JOIN produit p ON vp.id_produit = p.id_produit
    INNER JOIN marque m ON p.id_marque = m.id_marque
    INNER JOIN taille ON vp.id_taille = taille.id_taille
    INNER JOIN categorie ON p.id_categorie = categorie.id_categorie
    WHERE v.est_supprime = 0
      ${start_date ? `AND v.date_vente >= '${start_date}'` : ''}
      ${end_date ? `AND v.date_vente <= '${end_date}'` : ''}
    GROUP BY taille.taille
  `;

  db.query(q, (error, data) => {
    if (error) return res.status(500).send(error);

    return res.status(200).json(data);
  });
};

