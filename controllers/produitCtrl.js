const { db } = require("./../config/db.js");
const dotenv = require('dotenv');

dotenv.config();

exports.getProduitCount = (req, res) => {
    const q = "SELECT COUNT(*) AS total FROM varianteproduit WHERE est_supprime = 0";
  
    db.query(q ,(error, data)=>{
      if(error) res.status(500).send(error)
  
      return res.status(200).json(data);
  })
}

exports.getProduit = (req, res) => {

    const q = `SELECT produit.*,categorie.nom_categorie, marque.nom AS nom_marque, matiere.nom_matiere, famille.nom AS nom_famille FROM produit
                INNER JOIN categorie ON produit.id_categorie = categorie.id_categorie
                INNER JOIN marque ON produit.id_marque = marque.id_marque
                INNER JOIN matiere ON produit.id_matiere = matiere.id_matiere
                INNER JOIN famille ON categorie.id_famille = famille.id_famille
              WHERE est_supprime = 0`
     
    db.query(q, (error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
};

exports.getProduitOne = (req,res) => {

  const {id} = req.params;
  const q = `SELECT produit.*, categorie.nom_categorie,
                marque.nom AS nom_marque, matiere.nom_matiere,
                famille.nom AS nom_famille, famille.id_famille, cible.nom_cible
              FROM produit
              INNER JOIN categorie ON produit.id_categorie = categorie.id_categorie
              INNER JOIN marque ON produit.id_marque = marque.id_marque
              INNER JOIN matiere ON produit.id_matiere = matiere.id_matiere
              INNER JOIN famille ON categorie.id_famille = famille.id_famille
              INNER JOIN cible ON produit.id_cible = cible.id_cible
            WHERE est_supprime = 0 AND produit.id_produit = ?`;

  db.query(q, id, (error, data) => {
    if (error) res.status(500).send(error);
      return res.status(200).json(data);
  });
}


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
        varianteproduit.img, taille.taille, couleur.description, marque.nom, taille_pays.prix, varianteproduit.id_varianteProduit,
        CASE
          WHEN varianteproduit.stock > 0 THEN 'Actif'
          ELSE 'Inactif'
        END AS statut
      FROM
        varianteproduit
        INNER JOIN taille ON varianteproduit.id_taille = taille.id_taille
        INNER JOIN couleur ON varianteproduit.id_couleur = couleur.id_couleur
        INNER JOIN produit ON varianteproduit.id_produit = produit.id_produit
        INNER JOIN marque ON produit.id_marque = marque.id_marque
        INNER JOIN taille_pays ON taille.id_taille = taille_pays.id_taille
      WHERE
        varianteproduit.est_supprime = 0
        GROUP BY varianteproduit.code_variant
      ORDER BY varianteproduit.created_at DESC
      LIMIT 10 
    `;
  
    db.query(q, (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
    });
  };

exports.postProduit = (req, res) => {
    const qProduit = 'INSERT INTO produit(`nom_produit`,`id_categorie`,`id_marque`,`id_matiere`,`actif`,`date_entrant`,`date_MisAjour`,`id_cible`, `prix`, `code_variante`, `etatProduit`) VALUES(?)';
    const valuesProduit = [
      req.body.nom_produit,
      req.body.id_categorie,
      req.body.id_marque,
      req.body.id_matiere,
      req.body.actif,
      req.body.date_entrant,
      req.body.date_MisAjour,
      req.body.id_cible,
      req.body.prix,
      req.body.code_variante,
      req.body.etatProduit
    ];
  
    db.query(qProduit, [valuesProduit], (errorProduit, dataProduit) => {
      if (errorProduit) {
        res.status(500).json(errorProduit);
      } else {
        return res.json({ message: 'Processus réussi' });
      }
    });
  };

/* exports.deleteProduit = (req, res) => {
    const {id} = req.params;
    const q = "UPDATE produit SET est_supprime = 1 WHERE id_produit = ?";
  
    db.query(q, [id], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  }; */

exports.deleteProduit = (req, res) => {
    const {id} = req.params;
    const q = "DELETE FROM produit WHERE id_produit = ?";
  
    db.query(q, [id], (err, data) => {
      if (err) return res.send(err);
      return res.json(data);
    });
  };

exports.putProduit = (req, res) => {
    const productId = req.params.id;
  
    const q = 'UPDATE produit SET nom_produit = ?, couleur = ?, matiere = ?, marque = ?, pointure = ?, categorie = ?, description = ?, img = ? WHERE id = ?';
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

  //Code variant Produit
exports.getCodeVariantProduit = (req, res) => {

  const q = `SELECT code_variante FROM produit GROUP BY code_variante;`
   
  db.query(q, (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
  });
}

//Code variant
exports.getCodeVariant = (req, res) => {

  const q = `SELECT code_variant FROM varianteproduit GROUP BY code_variant;`
   
  db.query(q, (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
  });
}

 //Variant produit
exports.getVariantProduit = (req, res) => {

    const q = `SELECT varianteproduit.*
                FROM varianteproduit
              GROUP BY img;
    `;
     
    db.query(q, (error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
  }

exports.getVariantProduitAll = (req, res) => {

    const q = `SELECT varianteproduit.*
                FROM varianteproduit             
    `;
     
    db.query(q, (error, data) => {
        if (error) res.status(500).send(error);
        return res.status(200).json(data);
    });
  }

exports.getVariantProduitOne = (req, res) => {
    const { id } = req.params;
  
    const q = `
      SELECT varianteproduit.*, produit.nom_produit, produit.date_entrant, marque.nom AS nom_marque,
      categorie.nom_categorie, matiere.nom_matiere, cible.nom_cible, taille.taille AS pointure, pays.code_pays,
      couleur.description, taille_pays.prix, famille.nom AS nom_famille
      FROM varianteproduit
      INNER JOIN produit ON varianteproduit.id_produit = produit.id_produit 
      INNER JOIN marque ON produit.id_marque = marque.id_marque
      INNER JOIN categorie ON produit.id_categorie = categorie.id_categorie
      INNER JOIN matiere ON produit.id_matiere = matiere.id_matiere
      INNER JOIN cible ON produit.id_cible = cible.id_cible
      INNER JOIN taille ON varianteproduit.id_taille = taille.id_taille
      INNER JOIN pays ON taille.id_pays = pays.id_pays
      INNER JOIN couleur ON varianteproduit.id_couleur = couleur.id_couleur
      INNER JOIN taille_pays ON varianteproduit.code_variant = taille_pays.code_variant
      INNER JOIN famille ON categorie.id_famille = famille.id_famille 
      WHERE varianteproduit.id_varianteProduit = '${id}'
      ORDER BY taille.taille DESC 
    `;
    
    db.query(q, (error, data) => {
      if (error) return res.status(500).send(error);
      return res.status(200).json(data);
    });
  };

exports.getMouvementVariante = (req,res) => {
  const {id} = req.params;

  const q = `SELECT varianteproduit.*, produit.nom_produit, produit.date_entrant, marque.nom AS nom_marque,
  categorie.nom_categorie, matiere.nom_matiere, cible.nom_cible, taille.taille AS pointure, pays.code_pays,
  couleur.description, taille_pays.prix, famille.nom AS nom_famille
FROM varianteproduit
INNER JOIN produit ON varianteproduit.id_produit = produit.id_produit 
INNER JOIN marque ON produit.id_marque = marque.id_marque
INNER JOIN categorie ON produit.id_categorie = categorie.id_categorie
INNER JOIN matiere ON produit.id_matiere = matiere.id_matiere
INNER JOIN cible ON produit.id_cible = cible.id_cible
INNER JOIN taille ON varianteproduit.id_taille = taille.id_taille
INNER JOIN pays ON taille.id_pays = pays.id_pays
INNER JOIN couleur ON varianteproduit.id_couleur = couleur.id_couleur
INNER JOIN taille_pays ON taille.id_taille = taille_pays.id_taille
INNER JOIN famille ON categorie.id_famille = famille.id_famille 
WHERE produit.id_produit = '${id}'
GROUP BY varianteproduit.id_varianteproduit
ORDER BY taille.taille DESC;
  `
  db.query(q, (error, data) => {
    if (error) return res.status(500).send(error);
    return res.status(200).json(data);
  });
}

exports.getVariantProduitFiltrage = (req, res) => {
  const familleFilter = req.params.id.split(',');

  const q = `SELECT varianteproduit.*, produit.nom_produit, produit.date_entrant, marque.nom AS nom_marque,
  categorie.nom_categorie, matiere.nom_matiere, cible.nom_cible, taille.taille AS pointure, pays.code_pays,
  couleur.description, taille_pays.prix, famille.nom AS nom_famille
  FROM varianteproduit
  INNER JOIN produit ON varianteproduit.id_produit = produit.id_produit 
  INNER JOIN marque ON produit.id_marque = marque.id_marque
  INNER JOIN categorie ON produit.id_categorie = categorie.id_categorie
  INNER JOIN matiere ON produit.id_matiere = matiere.id_matiere
  INNER JOIN cible ON produit.id_cible = cible.id_cible
  INNER JOIN taille ON varianteproduit.id_taille = taille.id_taille
  INNER JOIN pays ON taille.id_pays = pays.id_pays
  INNER JOIN couleur ON varianteproduit.id_couleur = couleur.id_couleur
  INNER JOIN taille_pays ON varianteproduit.code_variant = taille_pays.code_variant
  INNER JOIN famille ON categorie.id_famille = famille.id_famille 
  WHERE famille.id_famille IN (${familleFilter.map(famille => `'${famille}'`).join(',')})
  GROUP BY varianteproduit.img
  `;
  
  db.query(q, (error, data) => {
    if (error) {
      return res.status(500).send(error);
    }
    return res.status(200).json(data);
  });
};

exports.getVariantProduitFiltrageMarque = (req, res) => {
    const marqueFilter = req.params.id.split(',');

    const q = `SELECT varianteproduit.*, produit.nom_produit, produit.date_entrant, marque.nom AS nom_marque,
            categorie.nom_categorie, matiere.nom_matiere, cible.nom_cible, taille.taille AS pointure, pays.code_pays,
            couleur.description, taille_pays.prix, famille.nom AS nom_famille
            FROM varianteproduit
            INNER JOIN produit ON varianteproduit.id_produit = produit.id_produit 
            INNER JOIN marque ON produit.id_marque = marque.id_marque
            INNER JOIN categorie ON produit.id_categorie = categorie.id_categorie
            INNER JOIN matiere ON produit.id_matiere = matiere.id_matiere
            INNER JOIN cible ON produit.id_cible = cible.id_cible
            INNER JOIN taille ON varianteproduit.id_taille = taille.id_taille
            INNER JOIN pays ON taille.id_pays = pays.id_pays
            INNER JOIN couleur ON varianteproduit.id_couleur = couleur.id_couleur
            INNER JOIN taille_pays ON varianteproduit.code_variant = taille_pays.code_variant
            INNER JOIN famille ON categorie.id_famille = famille.id_famille 
              WHERE marque.id_marque IN (${marqueFilter.map(marque =>`'${marque}'`).join(',')})
            GROUP BY varianteproduit.img
            `;
  
    db.query(q, (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
    });
  };

exports.getVariantProduitFiltrageCible = (req, res) => {
    const cibleFilter = req.params.id.split(',');

    const q = `SELECT varianteproduit.*, produit.nom_produit, produit.date_entrant, marque.nom AS nom_marque,
              categorie.nom_categorie, matiere.nom_matiere, cible.nom_cible, taille.taille AS pointure, pays.code_pays,
              couleur.description, taille_pays.prix, famille.nom AS nom_famille
              FROM varianteproduit
              INNER JOIN produit ON varianteproduit.id_produit = produit.id_produit 
              INNER JOIN marque ON produit.id_marque = marque.id_marque
              INNER JOIN categorie ON produit.id_categorie = categorie.id_categorie
              INNER JOIN matiere ON produit.id_matiere = matiere.id_matiere
              INNER JOIN cible ON produit.id_cible = cible.id_cible
              INNER JOIN taille ON varianteproduit.id_taille = taille.id_taille
              INNER JOIN pays ON taille.id_pays = pays.id_pays
              INNER JOIN couleur ON varianteproduit.id_couleur = couleur.id_couleur
              INNER JOIN taille_pays ON varianteproduit.code_variant = taille_pays.code_variant
              INNER JOIN famille ON categorie.id_famille = famille.id_famille 
                WHERE cible.id_cible IN (${cibleFilter.map(filter =>`'${filter}'`).join(',')}) 
              GROUP BY varianteproduit.img`;
  
    db.query(q, (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
    });
  };

exports.getVariantProduitFiltrageTaille = (req, res) => {
    const tailleFilter = req.params.id.split(',');;

    const q = `SELECT varianteproduit.*, produit.nom_produit, produit.date_entrant, marque.nom AS nom_marque,
                categorie.nom_categorie, matiere.nom_matiere, cible.nom_cible, taille.taille AS pointure, pays.code_pays,
                couleur.description, taille_pays.prix, famille.nom AS nom_famille
                FROM varianteproduit
                INNER JOIN produit ON varianteproduit.id_produit = produit.id_produit 
                INNER JOIN marque ON produit.id_marque = marque.id_marque
                INNER JOIN categorie ON produit.id_categorie = categorie.id_categorie
                INNER JOIN matiere ON produit.id_matiere = matiere.id_matiere
                INNER JOIN cible ON produit.id_cible = cible.id_cible
                INNER JOIN taille ON varianteproduit.id_taille = taille.id_taille
                INNER JOIN pays ON taille.id_pays = pays.id_pays
                INNER JOIN couleur ON varianteproduit.id_couleur = couleur.id_couleur
                INNER JOIN taille_pays ON varianteproduit.code_variant = taille_pays.code_variant
                INNER JOIN famille ON categorie.id_famille = famille.id_famille 
                  WHERE taille.id_taille IN (${tailleFilter.map(taille =>`'${taille}'`).join(',')})
                GROUP BY varianteproduit.img
              `;
  
    db.query(q, (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
    });
  };
  
// exports.postVariantProduit = (req, res) => {
//     const qVarianteProduit =
//       'INSERT INTO varianteproduit(`id_produit`, `id_taille`, `id_couleur`, `stock`, `code_variant`,`img`) VALUES (?, ?, ?, ?, ?, ?)';
//     const valuesVariante = [
//       req.body.id_produit,
//       req.body.id_taille,
//       req.body.id_couleur,
//       req.body.stock,
//       req.body.code_variant,
//       req.body.img
//     ];
  
//     const qTaillePays =
//       'INSERT INTO taille_pays(`id_taille`, `id_pays`, `id_couleur`, `stock`, `prix`, `code_variant`) VALUES (?, ?, ?, ?, ?, ?)';
//     const valuesTaillePays = [
//       req.body.id_taille,
//       req.body.id_pays,
//       req.body.id_couleur,
//       req.body.stock,
//       req.body.prix,
//       req.body.code_variant,
//     ];

// /*     const stockIncremente = 'SELECT id_taille, code_variante FROM varianteproduit WHERE id_taille = ? AND code_variante = ?'
//  */
  
//     db.query(qVarianteProduit, valuesVariante, (errorVariante, dataVariante) => {
//       if (errorVariante) {
//         res.status(500).json(errorVariante);
//       } else {
  
//         db.query(qTaillePays, valuesTaillePays, (errorTaillePays, dataTaillePays) => {
//           if (errorTaillePays) {
//             res.status(500).json(errorTaillePays);
//           } else {
//             res.json({ message: 'Processus réussi' });
//           }
//         });
//       }
//     });
//   };

exports.postVariantProduit = (req, res) => {
  const qVarianteProduit =
    'INSERT INTO varianteproduit(`id_produit`, `id_taille`, `id_couleur`, `stock`, `code_variant`,`img`) VALUES (?, ?, ?, ?, ?, ?)';
  const valuesVariante = [
    req.body.id_produit,
    req.body.id_taille,
    req.body.id_couleur,
    req.body.stock,
    req.body.code_variant,
    req.body.img
  ];

  const qTaillePays =
    'INSERT INTO taille_pays(`id_taille`, `id_pays`, `id_couleur`, `stock`, `prix`, `code_variant`) VALUES (?, ?, ?, ?, ?, ?)';
  const valuesTaillePays = [
    req.body.id_taille,
    req.body.id_pays,
    req.body.id_couleur,
    req.body.stock,
    req.body.prix,
    req.body.code_variant,
  ];

  const checkVariantQuery = 'SELECT id_produit, stock FROM varianteproduit WHERE code_variant = ? AND id_taille = ?';
  const codeVariant = req.body.code_variant;
  const idTaille = req.body.id_taille;

  db.query(checkVariantQuery, [codeVariant, idTaille], (error, results) => {
    if (error) {
      res.status(500).json(error);
    } else {
      if (results.length > 0) {
        // La variante existe déjà, vous pouvez modifier la quantité du stock existant
        const existingVariant = results[0];
        const newStock = parseInt(existingVariant.stock) + parseInt(req.body.stock);
        // Mettre à jour la quantité du stock pour la variante existante
        const updateStockQuery = 'UPDATE varianteproduit SET stock = ? WHERE id_produit = ? AND id_taille = ?';
        const updateStockValues = [newStock, existingVariant.id_produit, idTaille];

        db.query(updateStockQuery, updateStockValues, (updateError, updateResults) => {
          if (updateError) {
            res.status(500).json(updateError);
          } else {
            // Répondre avec succès
            res.json({ message: 'Processus réussi' });
          }
        });
      } else {
        // La variante n'existe pas, vous pouvez insérer une nouvelle variante
        db.query(qVarianteProduit, valuesVariante, (errorVariante, dataVariante) => {
          if (errorVariante) {
            res.status(500).json(errorVariante);
          } else {
            // Insérer les informations dans la table taille_pays
            db.query(qTaillePays, valuesTaillePays, (errorTaillePays, dataTaillePays) => {
              if (errorTaillePays) {
                res.status(500).json(errorTaillePays);
              } else {
                res.json({ message: 'Processus réussi' });
              }
            });
          }
        });
      }
    }
  });
};

exports.deleteVariantProduit = (req, res) => {
  const {id} = req.params;
  const q = "DELETE FROM varianteproduit WHERE id_varianteProduit = ?"

  db.query(q, [id], (err, data)=>{
      if (err) return res.send(err);
    return res.json(data);
  })
}
  
  //Couleur
exports.getCouleur = (req, res) => {

  const q = "SELECT * FROM couleur";
   
  db.query(q, (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
  });
}

exports.postCouleur = (req, res) => {
  const q = 'INSERT INTO couleur(`description`) VALUES (?)';

  const values = [
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
};

exports.deleteCouleur = (req, res) => {
  const {id} = req.params;
  const q = "DELETE FROM couleur WHERE id_couleur = ?"

  db.query(q, [id], (err, data)=>{
      if (err) return res.send(err);
    return res.json(data);
  })
};


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

//pays
exports.getPays = (req, res) => {

  const q = "SELECT * FROM pays";
  db.query(q, (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
  });
}

//Taille get
exports.getTailleAll = (req, res) => {

  const q = "SELECT * FROM taille GROUP BY taille";
  db.query(q, (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
  });
}


//taille id 
exports.getTaille = (req, res) => {
  const {id} = req.params;

  const q = "SELECT * FROM taille WHERE id_pays = ?";

  db.query(q, id, (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
  });
}

//Categorie des mouvement
exports.getCatMouvement = (req, res) => {

  const q = "SELECT * FROM categorie_mouvement";
  db.query(q, (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
  });
}

//Type des mouvement
exports.getTypeMouvement = (req, res) => {

  const q = "SELECT * FROM type_mouvement INNER JOIN categorie_mouvement ON type_mouvement.categorie_mouvement = categorie_mouvement.id_cat_mouvement";
  db.query(q, (error, data) => {
      if (error) res.status(500).send(error);
      return res.status(200).json(data);
  });
}

exports.postTypeMouvement = (req, res) => {
  const q = 'INSERT INTO type_mouvement(`type_mouvement`, `categorie_mouvement`) VALUES(?,?)';

  const values = [
      req.body.type_mouvement,
      req.body.categorie_mouvement
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

exports.deleteType_mouvement = (req, res) => {
  const {id} = req.params;
  const q = "DELETE FROM type_mouvement WHERE id = ?"

  db.query(q, [id], (err, data)=>{
      if (err) return res.send(err);
    return res.json(data);
  })
};

exports.putType_mouvement = (req, res) => {
  const {id} = req.params;
const q = "UPDATE type_mouvement SET `nom_type_mouvement`= ?, `type_mouvement`= ? WHERE id = ?"
const { nom_type_mouvement, type_mouvement} = req.body;


db.query(q, [nom_type_mouvement,type_mouvement, id], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
}

//mouvement
exports.getMouvement = (req, res) => {
  const q = `SELECT mouvement_stock.*, varianteproduit.stock, varianteproduit.img, type_mouvement.type_mouvement, marque.nom AS nom_marque, taille.taille,client.nom AS nom_client, client.id AS id_client1 FROM mouvement_stock 
              INNER JOIN varianteproduit ON mouvement_stock.id_varianteProduit = varianteproduit.id_varianteProduit 
              INNER JOIN type_mouvement ON mouvement_stock.id_type_mouvement = type_mouvement.id_type_mouvement 
              INNER JOIN detail_commande ON mouvement_stock.id_varianteProduit = detail_commande.id_varianteProduit 
              INNER JOIN taille ON varianteproduit.id_taille = taille.id_taille
              INNER JOIN produit ON varianteproduit.id_produit = produit.id_produit
              INNER JOIN marque ON produit.id_marque = marque.id_marque
              INNER JOIN commande ON mouvement_stock.id_commande = commande.id_commande
              INNER JOIN client ON commande.id_client = client.id
                WHERE detail_commande.est_supprime = 0 
                GROUP BY commande.id_commande
            `;

  db.query(q, (error, data) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    const mouvementData = data.map(mouvement => {
      let signe = "";
      if (mouvement.id_type_mouvement === 1) {
        signe = "+";
      } else if (mouvement.id_type_mouvement === 2) {
        signe = "-";
      }
      mouvement.quantite = `${signe}${mouvement.quantite}`;
      return mouvement;
    });

    return res.status(200).json(mouvementData);
  });
};

exports.getMouvementOne = (req, res) => {
  const {id} = req.params;

  const q = `SELECT mouvement_stock.*, varianteproduit.stock, varianteproduit.img, type_mouvement.type_mouvement, taille.taille,marque.nom AS nom_marque, taille.taille,client.nom AS nom_client FROM mouvement_stock 
  INNER JOIN varianteproduit ON mouvement_stock.id_varianteProduit = varianteproduit.id_varianteProduit 
  INNER JOIN type_mouvement ON mouvement_stock.id_type_mouvement = type_mouvement.id_type_mouvement 
  INNER JOIN taille ON varianteproduit.id_taille = taille.id_taille
  INNER JOIN produit ON varianteproduit.id_produit = produit.id_produit
  INNER JOIN marque ON produit.id_marque = marque.id_marque
  INNER JOIN commande ON mouvement_stock.id_commande = commande.id_commande
  INNER JOIN client ON commande.id_client = client.id
    WHERE mouvement_stock.id_commande = ?
 `;

  db.query(q,[id], (error, data) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    const mouvementData = data.map(mouvement => {
      let signe = "";
      if (mouvement.id_type_mouvement === 1) {
        signe = "+";
      } else if (mouvement.id_type_mouvement === 2) {
        signe = "-";
      }
      mouvement.quantite = `${signe}${mouvement.quantite}`;
      return mouvement;
    });

    return res.status(200).json(mouvementData);
  });
};

exports.postMouvement = (req, res) => {

  const qStocke = `SELECT stock FROM varianteproduit WHERE id_varianteProduit = ?`;
  const qStockeTaille = `SELECT stock FROM varianteproduit WHERE id_produit = ? AND id_taille = ? AND id_couleur = ?`;
  const qUpdateStock = `UPDATE varianteproduit SET stock = ? WHERE id_varianteProduit = ?`;
  const qInsertMouvement = 'INSERT INTO mouvement_stock(`id_varianteProduit`, `id_type_mouvement`, `quantite`, `id_user_cr`, `id_client`, `id_fournisseur`, `description`) VALUES(?,?,?,?,?,?,?)';

  const values = [ 
    req.body.id_varianteProduit,
    req.body.id_type_mouvement,
    req.body.quantite,
    req.body.id_user_cr,
    req.body.id_client,
    req.body.id_fournisseur,
    req.body.description
  ];

  db.query(qStocke, [req.body.id_varianteProduit], (error, stockData) => {
    if (error) {
      res.status(500).json(error);
      console.log(error);
    } else {
      const stockActuel = stockData[0].stock;

      db.query(qStockeTaille, [req.body.id_produit, req.body.id_taille, req.body.id_couleur], (error, stockTailleData) => {
        if (error) {
          res.status(500).json(error);
          console.log(error);
        } else {
          const stockTailleActuel = stockTailleData[0].stock;

          let newStockTaille;

          if (req.body.id_type_mouvement === 1) {
            newStockTaille = stockTailleActuel + parseInt(req.body.quantite);
          } else if (req.body.id_type_mouvement === 2) {
            newStockTaille = stockTailleActuel - parseInt(req.body.quantite);
            if (newStockTaille > stockActuel) {
              res.status(400).json({ error: 'Quantité de stock insuffisante ou taille invalide.' });
              return;
            }
            
            if (newStockTaille < 0) {
              res.status(400).json({ error: 'Quantité de stock insuffisante.' });
              return;
            }
          }

          db.query(qUpdateStock, [newStockTaille, req.body.id_varianteProduit], (error, updateData) => {
            if (error) {
              res.status(500).json(error);
              console.log(error);
            } else {
              db.query(qInsertMouvement, values, (error, mouvementData) => {
                if (error) {
                  res.status(500).json(error);
                  console.log(error);
                } else {
                  res.json('Processus réussi');
                }
              });
            }
          });
        }
      });
    }
  });
};

exports.deleteMouvement = (req, res) => {
  const {id} = req.params;
  const q = "DELETE FROM mouvement_stock  WHERE id_mouvement = ?"

  db.query(q, [id], (err, data)=>{
      if (err) return res.send(err);
    return res.json(data);
  })
};

exports.putMouvement = (req, res) => {
  const { id } = req.params;
  const q = "UPDATE type_mouvement SET `id_varianteproduit`= ?, `id_type_mouvement`= ?, `quantite`= ?, `id_utilisateur`= ?, `id_client`= ?, `id_fournisseur`= ?, `description`= ? WHERE id_mouvement = ?";
  const values = [
    req.body.id_varianteproduit,
    req.body.id_type_mouvement,
    req.body.quantite,
    req.body.id_utilisateur,
    req.body.id_client,
    req.body.id_fournisseur, 
    req.body.description,
    id
  ];

  db.query(q, values, (err, data) => {
    if (err) {
      return res.send(err);
    }
    return res.json(data);
  });
};

