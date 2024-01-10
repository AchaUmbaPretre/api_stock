const { db } = require("./../config/db");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs')

dotenv.config();


exports.getUser = (req, res) => {

    const q = `SELECT * FROM users;`
     
    db.query(q, (error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
  
}

exports.deleteUser = (req, res) => {
    const {id} = req.params;
    const q = "DELETE FROM users WHERE id = ?"
  
    db.query(q, [id], (err, data)=>{
        if (err) return res.send(err);
      return res.json(data);
    })
  }

  exports.putUser = (req, res) => {
    const { id } = req.params;

    const q = "UPDATE users SET `username` = ?, `email` = ?, `password` = ?, `role` = ? WHERE id = ?";
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