const { db } = require("./../config/db.js");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.getCatDepense = (req, res) => {
    const q = `SELECT * FROM categorie_depense`;
     
    db.query(q, (error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
}

exports.postCatDepense = (req, res) => {
    const q = 'INSERT INTO categorie_depense(`nom`, `description`) VALUES(?,?)';
  
    const values = [
        req.body.nom,
        req.body.description
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

exports.deleteCatDepense = (req, res) => {
    const clientId = req.params.id;
    const q = "DELETE categorie_depense WHERE id_catDepense = ?";
  
    db.query(q, [clientId], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });

}

exports.getDepense = (req, res) => {
    const q = `SELECT *, users.username, categorie_depense.nom AS nom_categorie FROM depenses
                INNER JOIN users ON depenses.id_livreur = users.id
                INNER JOIN categorie_depense ON depenses.id_catDepense = categorie_depense.id_catDepense`;
     
    db.query(q, (error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
}

exports.postDepense = (req, res) => {
    const q = 'INSERT INTO depenses(`id_livreur`, `id_catDepense`, `date_depense`, `montant`, `description`) VALUES(?,?,?,?,?)';
    const values = [
        req.body.id_livreur,
        req.body.id_catDepense,
        req.body.date_depense,
        req.body.montant,
        req.body.description
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

exports.deleteDepense = (req, res) => {
    const Id = req.params.id;
    const q = "DELETE depenses WHERE id_depense = ?";
  
    db.query(q, [Id], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });

}


exports.depenseTotal = (req, res) => {
    const q = "SELECT SUM(montant) AS total_depense FROM depenses";
  
    db.query(q ,(error, data)=>{
      if(error) res.status(500).send(error)
  
      return res.status(200).json(data);
  })
  }