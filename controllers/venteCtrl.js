const { db } = require("./../config/db.js");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.getVente = (req, res) => {
    const q = "SELECT * FROM vente WHERE est_supprime = 0";
     
    db.query(q, (error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
}

exports.postVente = (req, res) => {
    const q = 'INSERT INTO vente(`id_client`, `id_livreur`, `quantite`, `id_commande`,`	prix_unitaire`) VALUES(?,?,?,?,?)';
  
    const values = [
        req.body.id_client,
        req.body.id_livreur,
        req.body.quantite,
        req.body.id_commande,
        req.body.prix_unitaire
    ]
    db.query(q, values, (error, data) => {
      if (error) {
        res.status(500).json(error);
        console.log(error);
      } else {
        res.json('Processus réussi');
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