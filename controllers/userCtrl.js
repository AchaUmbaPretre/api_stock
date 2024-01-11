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

exports.getUserOne = (req, res) => {
  const {id} = req.params;

  const q = `SELECT * FROM users WHERE id = ?;`
   
  db.query(q,id, (error, data) => {
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

  exports.putUser = async (req, res) => {
    const { id } = req.params;
  
    const q = "UPDATE users SET `username` = ?, `email` = ?, `password` = ?, `role` = ? WHERE id = ?";
    const values = [
      req.body.username,
      req.body.email,
      req.body.password,
      req.body.role,
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