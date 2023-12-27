const { db } = require("./../config/db.js");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

//Client
exports.getClientCount = (req, res) => {
    const q = "SELECT COUNT(*) AS total FROM client WHERE est_supprime = 0";
  
    db.query(q ,(error, data)=>{
      if(error) res.status(500).send(error)
  
      return res.status(200).json(data);
  })
}
exports.getClient = (req, res) => {
    const q = "SELECT client.*, province.nom AS nom_province FROM client INNER JOIN province ON clients.ville = province.id WHERE est_supprime = 0";
     
    db.query(q, (error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
}

exports.postClient = (req, res) => {
    const q = 'INSERT INTO client(`nom`, `raison_sociale`, `adresse`, `email`, `telephone`, `id_province`) VALUES(?,?,?,?,?,?)';
  
    const values = [
        req.body.nom,
        req.body.raison_sociale,
        req.body.adresse,
        req.body.email,
        req.body.telephone,
        req.body.id_province,
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

exports.deleteClient = (req, res) => {
    const clientId = req.params.id;
    const q = "UPDATE client SET est_supprime = 1 WHERE id_client = ?";
  
    db.query(q, [clientId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });

}

exports.putClient = (req, res) => {
    const clientId = req.params.id;
  const q = "UPDATE client SET `nom`= ?, `raison_sociale`= ?, `adresse`= ?, `email`= ?, `telephone`= ?, `id_province`= ?WHERE id = ?"
  const values = [
    req.body.nom,
    req.body.raison_sociale,
    req.body.adresse,
    req.body.email,
    req.body.telephone,
    req.body.id_province,
]

  db.query(q, [...values,clientId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
}
