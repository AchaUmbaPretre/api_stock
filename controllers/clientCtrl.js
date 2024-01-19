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
    const q = `
    SELECT client.*, province.nom_province, commune.nom_commune FROM client 
      INNER JOIN province ON client.id_province = province.id_province 
      INNER JOIN commune ON client.commune = commune.id_commune
    WHERE est_supprime = 0
    `;
     
    db.query(q, (error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
}

exports.getClientOne = (req, res) => {
  const {id} = req.params;

  const q = `
  SELECT client.*, province.nom_province, commune.nom_commune FROM client 
    INNER JOIN province ON client.id_province = province.id_province 
    INNER JOIN commune ON client.commune = commune.id_commune
  WHERE est_supprime = 0 AND id = ?
  `;
   
  db.query(q,[id], (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
  });
}

exports.postClient = (req, res) => {
    const q = 'INSERT INTO client(`nom`, `raison_sociale`, `adresse`, `email`, `telephone`, `id_province`,`avenue`, `quartier`, `commune`, `num`) VALUES(?,?,?,?,?,?,?,?,?,?)';
  
    const values = [
        req.body.nom,
        req.body.raison_sociale,
        req.body.adresse,
        req.body.email,
        req.body.telephone,
        req.body.id_province,
        req.body.avenue,
        req.body.quartier,
        req.body.commune,
        req.body.num
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
    const q = "UPDATE client SET est_supprime = 1 WHERE id = ?";
  
    db.query(q, [clientId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });

}

exports.putClient = (req, res) => {
    const clientId = req.params.id;
  const q = "UPDATE client SET `nom`= ?, `raison_sociale`= ?, `adresse`= ?, `email`= ?, `telephone`= ?, `id_province`= ?, `avenue`= ?, `quartier`= ?, `commune`= ?, `num`  WHERE id = ?"
  
  const values = [
    req.body.nom,
    req.body.raison_sociale,
    req.body.adresse,
    req.body.email,
    req.body.telephone,
    req.body.id_province,
    req.body.avenue,
    req.body.quartier,
    req.body.commune,
    req.body.num
]

  db.query(q, [...values,clientId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
}

//province

exports.getProvince = (req, res) => {
    const q = "SELECT * FROM province";
     
    db.query(q, (error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
}
//Commune
exports.getCommune = (req, res) => {
  const {id} = req.params;

  const q = `SELECT * FROM commune WHERE id_province = ?`;
   
  db.query(q, [id], (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
  });
}