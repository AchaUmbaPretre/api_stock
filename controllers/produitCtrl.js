const { db } = require("./../config/db.js");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.getProduitCount = (req, res) => {
    const q = "SELECT COUNT(*) AS total FROM produits WHERE est_supprime = 0";
  
    db.query(q ,(error, data)=>{
      if(error) res.status(500).send(error)
  
      return res.status(200).json(data);
  })
}


exports.getProduit = (req, res) => {

    const q = `SELECT *, matiere.nom AS nom_matiere, marque.nom AS nom_marque, emplacement.nom AS nom_emplacement, CASE
    WHEN chaussures.quantite_stock > 0 THEN 'Actif'
    ELSE 'Inactif'
    END AS statut FROM produits 
    INNER JOIN chaussures ON produits.id = chaussures.produit_id 
    INNER JOIN categories ON produits.categorie = categories.id
    INNER JOIN couleur ON produits.couleur = couleur.id
    INNER JOIN matiere ON produits.matiere = matiere.id
    INNER JOIN marque ON produits.marque = marque.id
    INNER JOIN emplacement ON chaussures.emplacement = emplacement.id
    WHERE produits.est_supprime = 0`
     
    db.query(q, (error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
};


exports.getProduitTotalAchats = (req, res) => {
    const q = `
      SELECT
        SUM(prix) AS achats_total
      FROM
        chaussures
    `;

    db.query(q, (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
    });
  };

exports.getProduitRecement = (req, res) => {
    const q = `
      SELECT
        *,
        CASE
          WHEN chaussures.quantite_stock > 0 THEN 'Actif'
          ELSE 'Inactif'
        END AS statut
      FROM
        produits
        INNER JOIN chaussures ON produits.id = chaussures.produit_id
        INNER JOIN categories ON produits.categorie = categories.id
        INNER JOIN couleur ON produits.couleur = couleur.id
      WHERE
        produits.est_supprime = 0
      ORDER BY chaussures.date_entree DESC
      LIMIT 10
    `;
  
    db.query(q, (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
    });
  };

  exports.postProduit = (req, res) => {
    const q = 'INSERT INTO produits(`nom_produit`,`id_categorie`,`id_marque`,`id_matiere`,`actif`,`date_entrant`,`date_MisAjour`,`id_cible`, `prix`) VALUES(?)';
    const values = [
        req.body.nom_produit,
        req.body.id_categorie,
        req.body.id_marque,
        req.body.id_matiere,
        req.body.actif,
        req.body.date_entrant,
        req.body.date_MisAjour,
        req.body.id_cible
    ]

    db.query(q, [values], (error,data)=>{
      if (error) {
        res.status(500).json(error);
      } else {
        return res.json({ message: 'Processus réussi'});
        }
      })
}
exports.deleteProduit = (req, res) => {
    const {id} = req.params;
    const q = "UPDATE produits SET est_supprime = 1 WHERE id = ?";
  
    db.query(q, [id], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  };

exports.putProduit = (req, res) => {
    const productId = req.params.id;
  
    const q = 'UPDATE produits SET nom_produit = ?, couleur = ?, matiere = ?, marque = ?, pointure = ?, categorie = ?, description = ?, img = ? WHERE id = ?';
    const values = [
      req.body.nom_produit,
      req.body.couleur,
      req.body.matiere,
      req.body.marque,
      req.body.pointure,
      req.body.categorie,
      req.body.description,
      req.body.img,
      productId 
    ];
  
    db.query(q, values, (error, data) => {
      if (error) {
        console.log(error);
        res.status(500).json(error);
      } else {
        const updatedRows = data.affectedRows;
  
        if (updatedRows === 0) {
          return res.status(404).json({ error: 'Produit non trouvé' });
        }
  
        const shoeQ = 'UPDATE chaussures SET quantite_stock = ?, emplacement = ?, prix = ? WHERE produit_id = ?';
        const shoeValues = [
          req.body.quantite_stock,
          req.body.emplacement,
          req.body.prix,
          productId 
        ];
  
        db.query(shoeQ, shoeValues, (error, data) => {
          if (error) {
            console.error('Erreur lors de la mise à jour des données de la chaussure :', error);
            res.status(500).json({ error: 'Erreur lors de la mise à jour des données de la chaussure' });
            return;
          }
  
          return res.json({ message: 'Produit mis à jour avec succès' });
        });
      }
    });
  };

  //Couleur
exports.getCouleur = (req, res) => {

  const q = "SELECT * FROM couleur";
   
  db.query(q, (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
  });
}

//Categorie
exports.getCategorie = (req, res) => {

  const q = "SELECT * FROM categorie INNER JOIN famille ON categorie.id_famille = famille.id_famille";
   
  db.query(q, (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
  });
}

exports.getCategorieOne = (req, res) => {
  const {id} = req.params;

  const q = "SELECT * FROM categorie WHERE id = ?";
   
  db.query(q, id, (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
  });
}

exports.postCategorie = (req, res) => {
  const q = 'INSERT INTO categorie(`nom_categorie`,`id_famille`) VALUES (?,?)';

  const values = [
    req.body.nom_categorie,
    req.body.id_famille
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

exports.deleteCategorie = (req, res) => {
  const {id} = req.params;
  const q = "DELETE FROM categorie WHERE id = ?"

  db.query(q, [id], (err, data)=>{
      if (err) return res.send(err);
    return res.json(data);
  })
};

exports.putCategorie = (req, res) => {
  const {id} = req.params;
const q = "UPDATE categorie SET `nom_categorie`= ? WHERE id = ?"
const { nom_categorie } = req.body;


db.query(q, [nom_categorie,id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
}


//Emplacement
exports.getEmplacement = (req, res) => {

  const q = "SELECT * FROM emplacement";
   
  db.query(q, (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
  });
}

exports.getEmplacementOne = (req, res) => {
  const {id} = req.params;

  const q = "SELECT * FROM emplacement id =?";
   
  db.query(q, id,(error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
  });
}

exports.postEmplacement = (req, res) => {
  const q = 'INSERT INTO emplacement(`nom`, `capacite`) VALUES(?,?)';

  const values = [
      req.body.nom,
      req.body.capacite
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

exports.deleteEmplacement = (req, res) => {
  const {id} = req.params;
  const q = "DELETE FROM emplacement WHERE id = ?"

  db.query(q, [id], (err, data)=>{
      if (err) return res.send(err);
    return res.json(data);
  })
};

exports.putEmplacement = (req, res) => {
  const { id } = req.params;

  const q = "UPDATE emplacement SET `nom` = ?, `capacite` = ? WHERE id = ?";
  const values = [
    req.body.nom,
    req.body.capacite
  ];

  db.query(q, [...values, id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
};

//Matiere
exports.getMatiere = (req, res) => {

  const q = "SELECT * FROM matiere";
   
  db.query(q, (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
  });
}

exports.getMatiereOne = (req, res) => {
  const {id} = req.params;

  const q = "SELECT * FROM matiere WHERE id = ?";
   
  db.query(q,[id], (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
  });
}

exports.postMatiere = (req, res) => {
  const q = 'INSERT INTO matiere(`nom_matiere`) VALUES(?)';

  const values = [
      req.body.nom,
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

exports.deleteMatiere = (req, res) => {
  const { id } = req.params;
  const q = "DELETE FROM matiere WHERE id = ?";

  db.query(q, [id], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
};

exports.putMatiere = (req, res) => {
  const { id } = req.params;
  const q = "UPDATE matiere SET `nom` = ? WHERE id = ?";
  const values = [
    req.body.nom,
    id
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
};

//Marque
exports.getMarque = (req, res) => {

  const q = "SELECT * FROM marque ";
   
  db.query(q, (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
  });
}


exports.getMarqueOne = (req, res) => {
  const {id} = req.params;
  const q = "SELECT * FROM marque WHERE id = ?";
   
  db.query(q, id, (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
  });
}

exports.postMarque = (req, res) => {
  const q = 'INSERT INTO marque(`nom`) VALUES(?)';

  const values = [
      req.body.nom,
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

exports.deleteMarque = (req, res) => {
  const { id } = req.params;
  const q = "DELETE FROM marque WHERE id = ?";

  db.query(q, [id], (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
};

exports.putMarque = (req, res) => {
  const { id } = req.params;
  const q = "UPDATE marque SET `nom` = ? WHERE id = ?";
  const values = [
    req.body.nom,
    id
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }
    return res.json(data);
  });
};
//famille
exports.getFamille = (req, res) => {

  const q = "SELECT * FROM famille";
   
  db.query(q, (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
  });
}

//cible
exports.getCible = (req, res) => {

  const q = "SELECT * FROM cible";
  db.query(q, (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
  });
}
