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
    const q = `SELECT detail_livraison.*,varianteproduit.img  FROM detail_livraison
                INNER JOIN varianteproduit ON detail_livraison.id_varianteProduit = varianteproduit.id_varianteProduit
              `;
   
  db.query(q, (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
  });
}

exports.getLivraisonDetailOne = (req, res)=>{
    const {id} = req.params;
    const q = `SELECT * FROM detail_livraison WHERE id_detail_livraison = ?`;
   
  db.query(q,id, (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
  });
}

exports.postLivraisonDetail = (req, res) => {
  const getIdCommandeQuery = 'SELECT prix, quantite FROM detail_commande WHERE id_varianteProduit = ?';

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

        const insertQuery = 'INSERT INTO detail_livraison (id_commande, id_varianteProduit, qte_livre, qte_commande, prix, package, id_package, user_cr) VALUES (?,?,?,?,?,?,?,?)';

        const values = [
          req.body.id_commande,
          idVarianteProduit,
          quantiteLivre,
          req.body.qte_commande,
          prixTotal,
          req.body.package,
          req.body.id_package,
          req.body.user_cr
        ];

        db.query(insertQuery, values, (insertError, insertData) => {
          if (insertError) {
            res.status(500).json(insertError);
            console.log(insertError);
          } else {
            // Actions supplémentaires après l'insertion des données
            // Par exemple, mettre à jour d'autres tables
            // ou envoyer une réponse JSON
            // ou effectuer d'autres opérations logiques

            res.json('Processus réussi');
          }
        });
      } else {
        res.status(404).json('Prix ou quantité non trouvés pour l\'id_varianteProduit spécifié');
      }
    }
  });
};

exports.deleteLivraisonDetail = (req, res) => {
    const {id} = req.params;
    const q = "DELETE FROM detail_livraison WHERE id_detail_livraison = ?"
  
    db.query(q, [id], (err, data)=>{
        if (err) return res.send(err);
      return res.json(data);
    })
}