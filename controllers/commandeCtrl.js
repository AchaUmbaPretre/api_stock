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
    const q = "SELECT * FROM demande_commande WHERE est_supprime = 0";
     
    db.query(q, (error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
}

exports.postDemandeCommande = (req, res) => {
    const q = 'INSERT INTO demande_commande(`id_client`, `statut_demande`,`description`, `quantite`) VALUES(?,?,?,?)';
  
    const values = [
        req.body.id_client,
        req.body.statut_demande,
        req.body.description,
        req.body.quantite
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
  

exports.deleteDemandeCommande = (req, res) => {
    const {id} = req.params;
    const q = "DELETE FROM demande_commande WHERE id_demande_commande = ?"
  
    db.query(q, [id], (err, data)=>{
        if (err) return res.send(err);
      return res.json(data);
    })
  };

//Commande

exports.getCommandeCount = (req, res) => {
    const q = "SELECT COUNT(*) AS total FROM commande WHERE est_supprime = 0";
  
    db.query(q ,(error, data)=>{
      if(error) res.status(500).send(error)
  
      return res.status(200).json(data);
  })
}
exports.getDemandeCommande = (req, res) => {
    const q = "SELECT * FROM commande WHERE est_supprime = 0";
     
    db.query(q, (error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
}

exports.postDemandeCommande = (req, res) => {
    const q = 'INSERT INTO commande(`id_client`, `statut`,`quantite`, `livraison`, `paiement`, `retour`) VALUES(?,?,?,?,?,?)';
  
    const values = [
        req.body.id_client,
        req.body.statut,
        req.body.quantite,
        req.body.livraison,
        req.body.paiement,
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