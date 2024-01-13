const { db } = require("./../config/db.js");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

//Client
exports.getDemandeCommandeCount = (req, res) => {
    const q = "SELECT COUNT(*) AS total FROM demande_commande WHERE est_supprime = 0";
  
    db.query(q ,(error, data)=>{
      if(error) res.status(500).send(error)
  
      return res.status(200).json(data);
  })
}

exports.getDemandeCommande = (req, res) => {
    const q = `SELECT detail_commande.*, varianteproduit.img, taille.taille, users.username
                FROM detail_commande 
                INNER JOIN varianteproduit ON detail_commande.id_varianteProduit = varianteproduit.id_varianteProduit
                INNER JOIN taille ON detail_commande.id_taille = taille.id_taille
                INNER JOIN users ON detail_commande.user_cr = users.id 
                WHERE detail_commande.est_supprime = 0 GROUP BY id_commande`;
     
    db.query(q, (error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
}

exports.getDemandeCommandeAll = (req, res) => {
  const {id} = req.params
  const q = `SELECT detail_commande.*, varianteproduit.img, taille.taille, users.username
              FROM detail_commande 
              INNER JOIN varianteproduit ON detail_commande.id_varianteProduit = varianteproduit.id_varianteProduit
              INNER JOIN taille ON varianteproduit.id_taille = taille.id_taille
              INNER JOIN users ON detail_commande.user_cr = users.id
              WHERE detail_commande.est_supprime = 0 AND detail_commande.id_commande = ?`;
   
  db.query(q,id, (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
  });
}

exports.postDemandeCommande = (req, res) => {
  const selectQuery = `
    SELECT id_commande, id_varianteProduit, id_client, prix, statut_demande, description, id_taille, quantite, user_cr
    FROM detail_commande
    WHERE id_varianteProduit = ? AND id_taille = ?
  `;

  const insertQuery = `
    INSERT INTO detail_commande(id_commande, id_varianteProduit, id_client, prix, statut_demande, description, id_taille, quantite, user_cr)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const updateQuery = `
  UPDATE detail_commande
  SET quantite = quantite + ?, prix = prix + ?
  WHERE id_varianteProduit = ? AND id_taille = ?
`;
  const selectValues = [req.body.id_varianteProduit, req.body.id_taille];
  const insertValues = [
    req.body.id_commande,
    req.body.id_varianteProduit,
    req.body.id_client,
    req.body.prix,
    req.body.statut_demande,
    req.body.description,
    req.body.id_taille,
    req.body.quantite,
    req.body.user_cr
  ];
  console.log(insertValues)
  const updateValues = [
    req.body.quantite,
    req.body.prix,
    req.body.id_varianteProduit,
    req.body.id_taille
  ];

  db.query(selectQuery, selectValues, (error, rows) => {
    if (error) {
      res.status(500).json(error);
      console.log(error);
      return;
    }

    if (rows.length === 0) {
      // Aucune ligne trouvée, effectuer une insertion
      db.query(insertQuery, insertValues, (error, data) => {
        if (error) {
          res.status(500).json(error);
          console.log(error);
        } else {
          res.json('Processus réussi');
        }
      });
    } else {
      // Ligne trouvée, effectuer une mise à jour
      db.query(updateQuery, updateValues, (error, data) => {
        if (error) {
          res.status(500).json(error);
          console.log(error);
        } else {
          res.json('Processus réussi');
        }
      });
    }
  });
};

exports.deleteDemandeCommande = (req, res) => {
    const {id} = req.params;
    console.log(id)
    const q = "DELETE FROM detail_commande WHERE id_detail = ?"
  
    db.query(q, [id], (err, data)=>{
        if (err) return res.send(err);
      return res.json(data);
    })
  };

//Commande

exports.getCommande = (req, res) => {
  const q = `SELECT *
            FROM commande
            INNER JOIN client ON commande.id_client = client.id
            INNER JOIN statut ON commande.statut = statut.id_statut
            WHERE commande.est_supprime = 0;`;
   
  db.query(q, (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
  });
}

exports.getCommandeOne = (req, res) => {
  const {id} = req.params;

  const q = `SELECT *
            FROM commande
            INNER JOIN client ON commande.id_client = client.id
            INNER JOIN statut ON commande.statut = statut.id_statut
            WHERE commande.est_supprime = 0 AND commande.id_commande = ?`;
   
  db.query(q,id, (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
  });
}

exports.getCommandeCount = (req, res) => {
    const q = "SELECT COUNT(*) AS total FROM commande WHERE est_supprime = 0";
  
    db.query(q ,(error, data)=>{
      if(error) res.status(500).send(error)
  
      return res.status(200).json(data);
  })
}

exports.postCommande = (req, res) => {
    const q = 'INSERT INTO commande(`id_client`, `statut`, `id_livraison`, `id_paiement`, `user_cr`, `id_shop`, `paye`, `retour`) VALUES(?,?,?,?,?,?,?,?)';
    const paye = req.body.paye !== undefined ? req.body.paye : 0;
    const values = [
        req.body.id_client,
        req.body.statut,
        req.body.id_livraison || 0,
        req.body.id_paiement || 0,
        req.body.user_cr || 0,
        req.body.id_shop || 1,
        paye,
        req.body.retour 
    ]
    db.query(q, values, (error, data) => {
      if (error) {
        res.status(500).json(error);
        console.log(error);
      } else {
        res.json('Processus réussi');
      }
    });
  };

  exports.putCommande = (req, res) => {
    const { id } = req.params;

    const q = "UPDATE commande SET `id_client` = ?, `statut` = ?, `id_livraison` = ?, `id_paiement` = ?, `user_cr` = ?, `id_shop` = ?, `paye` = ?, `retour` = ? WHERE id_commande = ?";
    const values = [
      req.body.id_client,
      req.body.statut,
      req.body.id_livraison || 0,
      req.body.id_paiement || 0,
      req.body.user_cr || 0,
      req.body.id_shop || 1,
      req.body.paye || 0,
      req.body.retour,
      id
    ];

    db.query(q, values, (err, data) => {
      if (err) {
        console.error(err);
        console.log(err)
        return res.status(500).json(err);
      }
      return res.json(data);
    });
  };

exports.deleteCommande = (req, res) => {
    const {id} = req.params;
    const q = "DELETE FROM commande WHERE id_commande = ?"
  
    db.query(q, [id], (err, data)=>{
        if (err) return res.send(err);
      return res.json(data);
    })
  }

  //Status

  exports.getStatus = (req, res) => {
    const q = `SELECT *
              FROM statut`;
     
    db.query(q, (error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
  }