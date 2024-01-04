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
    const q = "SELECT * FROM detail_commande WHERE est_supprime = 0";
     
    db.query(q, (error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
}

exports.postDemandeCommande = (req, res) => {
  const q = 'INSERT INTO detail_commande(`id_commande`, `id_varianteProduit`, `id_client`, `prix`, `statut_demande`, `description`, `quantite`, `user_cr`) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';

  const values = [
    req.body.id_commande,
    req.body.id_varianteProduit,
    req.body.id_client,
    req.body.prix,
    req.body.statut_demande,
    req.body.description,
    req.body.quantite,
    req.body.user_cr
  ];

  db.query(q, values, (error, data) => {
    if (error) {
      res.status(500).json(error);
      console.log(error);
    } else {
      res.json('Processus réussi');
    }
  });
};

exports.deleteDemandeCommande = (req, res) => {
    const {id} = req.params;
    const q = "DELETE FROM detail_commande WHERE id_detail_commande = ?"
  
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
            WHERE commande.est_supprime = 0;`;
   
  db.query(q, (error, data) => {
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