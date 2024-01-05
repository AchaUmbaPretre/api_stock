const { db } = require("./../config/db.js");
const dotenv = require('dotenv');

dotenv.config();

exports.getLivraison = (req, res)=>{
    const q = `SELECT * FROM livraison`;
   
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
    const q = `SELECT * FROM detail_livraison`;
   
  db.query(q, (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
  });
}

exports.getLivraisonOne = (req, res)=>{
    const {id} = req.params;
    const q = `SELECT * FROM detail_livraison WHERE id_detail_livraison = ?`;
   
  db.query(q,id, (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
  });
}

exports.postLivraisonDetail = (req, res) => {
    const q = 'INSERT INTO detail_livraison`(`date_livre`, `user_cr`) VALUES(?,?)';
    const values = [
        req.body.date_livre,
        req.body.user_cr,
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

exports.deleteLivraisonDetail = (req, res) => {
    const {id} = req.params;
    const q = "DELETE FROM detail_livraison WHERE id_detail_livraison = ?"
  
    db.query(q, [id], (err, data)=>{
        if (err) return res.send(err);
      return res.json(data);
    })
}