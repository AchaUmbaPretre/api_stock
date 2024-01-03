const { db } = require("./../config/db.js");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();


exports.registerController = async (req, res) =>{
    const { username, email, password, role } = req.body;

  try {
    // Vérifier si l'utilisateur existe déjà
    const query = "SELECT * FROM users WHERE email = ?";
    const values = [email];

    connection.query(query, values, async (err, results) => {
      if (err) {
        res.status(500).json(err);
      } else {
        if (results.length > 0) {
          res.status(409).json("L'utilisateur existe déjà.");
        } else {
          // Hachage du mot de passe
          const hashedPassword = await bcrypt.hash(password, 10);

          const insertQuery = "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
          const insertValues = [username, email, hashedPassword, role];

          connection.query(insertQuery, insertValues, (err, insertResult) => {
            if (err) {
              res.status(500).json(err);
            } else {
              res.status(201).json("Utilisateur enregistré avec succès");
            }
          });
        }
      }
    });
  } catch (err) {
    res.status(500).json(err);
  }
}

exports.loginController = async (req, res) => {
    const { username, password } = req.body;

    const query = "SELECT * FROM users WHERE username = ?";
    const values = [username];
  
    connection.query(query, values, async (err, results) => {
      if (err) {
        res.status(500).json(err);
      } else {
        const user = results[0];
  
        if (!user) {
          res.status(401).json("Identifiants incorrects");
          return;
        }
  
        try {
          const passwordMatch = await bcrypt.compare(password, user.password);
  
          if (!passwordMatch) {
            res.status(401).json("Identifiants incorrects");
            return;
          }
  
          const accessToken = jwt.sign(
            {
              id: user.id,
              role: user.role,
            },
            process.env.JWT_SEC,
            { expiresIn: "3d" }
          );
  
          const { password: userPassword, ...others } = user;
  
          res.status(200).json({ ...others, accessToken });
        } catch (err) {
          res.status(500).json(err);
        }
      }
    });
}