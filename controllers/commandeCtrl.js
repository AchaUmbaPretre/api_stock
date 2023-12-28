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
    const q = 'INSERT INTO demande_commande(`nom_type_mouvement`, `type_mouvement`) VALUES(?,?)';
  
    const values = [
        req.body.nom_type_mouvement,
        req.body.type_mouvement
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

