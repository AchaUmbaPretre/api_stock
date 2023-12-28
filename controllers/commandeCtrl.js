const { db } = require("./../config/db.js");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

//Client
exports.getCommandeCount = (req, res) => {
    const q = "SELECT COUNT(*) AS total FROM demande_commande WHERE est_supprime = 0";
  
    db.query(q ,(error, data)=>{
      if(error) res.status(500).send(error)
  
      return res.status(200).json(data);
  })
}
exports.getCommande = (req, res) => {
    const q = "SELECT * FROM demande_commande WHERE est_supprime = 0";
     
    db.query(q, (error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
}

exports.deleteCommande = (req, res) => {
    const {id} = req.params;
    const q = "DELETE FROM demande_commande WHERE id_demande_commande = ?"
  
    db.query(q, [id], (err, data)=>{
        if (err) return res.send(err);
      return res.json(data);
    })
  };