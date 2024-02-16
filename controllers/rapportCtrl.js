const { db } = require("./../config/db.js");
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.getRapportVente = (req, res) => {
    const { start_date, end_date, marque_id } = req.query;
  
    let q = `
    SELECT
    m.id_marque,
    SUM(v.quantite) AS quantite_vendue,
    SUM(v.prix_unitaire * v.quantite) AS montant_vendu,
    vp.stock AS quantite_en_stock,
    vp.img,
    taille.taille,
    m.nom AS nom_marque,
    categorie.nom_categorie
  FROM vente v
  INNER JOIN detail_commande ON v.id_detail_commande = detail_commande.id_detail
  INNER JOIN varianteproduit vp ON detail_commande.id_varianteProduit = vp.id_varianteProduit
  INNER JOIN produit p ON vp.id_produit = p.id_produit
  INNER JOIN marque m ON p.id_marque = m.id_marque
  INNER JOIN taille ON vp.id_taille = taille.id_taille
  INNER JOIN categorie ON p.id_categorie = categorie.id_categorie
  WHERE v.est_supprime = 0
        ${start_date ? `AND v.date_vente >= '${start_date}'` : ''}
        ${end_date ? `AND v.date_vente <= '${end_date}'` : ''}
    `;
  
    if (marque_id) {
      q += ` AND m.id_marque = ${marque_id}`;
    }
  
    q += ' GROUP BY m.id_marque';
  
    try {
      db.query(q, (error, data) => {
        if (error) {
          return res.status(500).json({ error: 'Tous les champs sont requis' });
        }
  
        return res.status(200).json(data);
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  
exports.getRapportVenteAll = (req, res) => {
    const { id_marque } = req.params;
  
    let q = `
    SELECT
    m.id_marque,
    SUM(v.quantite) AS quantite_vendue,
    SUM(v.prix_unitaire * v.quantite) AS montant_vendu,
    vp.stock AS quantite_en_stock,
    vp.img,
    taille.taille,
    m.nom AS nom_marque,
    categorie.nom_categorie,
    couleur.description
  FROM vente v
  INNER JOIN detail_commande ON v.id_detail_commande = detail_commande.id_detail
  INNER JOIN varianteproduit vp ON detail_commande.id_varianteProduit = vp.id_varianteProduit
  INNER JOIN produit p ON vp.id_produit = p.id_produit
  INNER JOIN couleur ON vp.id_couleur = couleur.id_couleur
  INNER JOIN marque m ON p.id_marque = m.id_marque
  INNER JOIN taille ON vp.id_taille = taille.id_taille
  INNER JOIN categorie ON p.id_categorie = categorie.id_categorie
  WHERE v.est_supprime = 0 AND m.id_marque = ${id_marque} 
    GROUP BY taille.id_taille 
    `;
  
    try {
      db.query(q, (error, data) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }
  
        return res.status(200).json(data);
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  
exports.getRapportVenteSearch = (req, res) => {
    const { start_date, end_date, id_marque } = req.query;
    console.log(req.query)
  
    let q = `
      SELECT
      m.id_marque,
      SUM(v.quantite) AS quantite_vendue,
      SUM(v.prix_unitaire * v.quantite) AS montant_vendu,
      vp.stock AS quantite_en_stock,
      vp.img,
      taille.taille,
      m.nom AS nom_marque,
      categorie.nom_categorie,
      couleur.description
    FROM vente v
    INNER JOIN detail_commande ON v.id_detail_commande = detail_commande.id_detail
    INNER JOIN varianteproduit vp ON detail_commande.id_varianteProduit = vp.id_varianteProduit
    INNER JOIN produit p ON vp.id_produit = p.id_produit
    INNER JOIN couleur ON vp.id_couleur = couleur.id_couleur
    INNER JOIN marque m ON p.id_marque = m.id_marque
    INNER JOIN taille ON vp.id_taille = taille.id_taille
    INNER JOIN categorie ON p.id_categorie = categorie.id_categorie
    WHERE v.est_supprime = 0
      ${id_marque ? `AND m.id_marque = ${id_marque}` : ''}
      ${start_date ? `AND v.date_vente >= '${start_date}'` : ''}
      ${end_date ? `AND v.date_vente <= '${end_date}'` : ''}
    GROUP BY taille.id_taille
    `;
  
    try {
      db.query(q, (error, data) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }
  
        return res.status(200).json(data);
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  
exports.getRapportVenteClient = (req, res) => {
  
    let q = `
        SELECT vente.*, users.username, varianteproduit.img, client.nom AS nom_client, client.telephone, marque.nom AS nom_marque, taille.taille AS pointure,
        statut.nom_statut AS statut,
        SUM(vente.quantite) AS total_varianteproduit,
        SUM(vente.prix_unitaire) AS total_prix_vente
      FROM vente
        INNER JOIN users ON vente.id_livreur = users.id
        INNER JOIN detail_commande ON vente.id_detail_commande = detail_commande.id_detail
        INNER JOIN varianteproduit ON varianteproduit.id_varianteProduit = detail_commande.id_varianteProduit
        INNER JOIN produit ON varianteproduit.id_produit = produit.id_produit
        INNER JOIN marque ON produit.id_marque = marque.id_marque
        INNER JOIN commande ON vente.id_commande = commande.id_commande
        INNER JOIN statut ON commande.statut = statut.id_statut
        INNER JOIN client ON commande.id_client = client.id
        INNER JOIN taille ON varianteproduit.id_taille = taille.id_taille
      WHERE vente.est_supprime = 0
      GROUP BY client.id
    `;
  
    try {
      db.query(q, (error, data) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }
  
        return res.status(200).json(data);
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  
  exports.getRapportVenteClientOne = (req, res) => {
    const clientId = req.params.clientId;
  
    let q = `
        SELECT vente.*, users.username, varianteproduit.img, client.nom AS nom_client, client.telephone, marque.nom AS nom_marque, taille.taille AS pointure,
        statut.nom_statut AS statut,
        SUM(vente.quantite) AS total_varianteproduit,
        SUM(vente.prix_unitaire) AS total_prix_vente
      FROM vente
        INNER JOIN users ON vente.id_livreur = users.id
        INNER JOIN detail_commande ON vente.id_detail_commande = detail_commande.id_detail
        INNER JOIN varianteproduit ON varianteproduit.id_varianteProduit = detail_commande.id_varianteProduit
        INNER JOIN produit ON varianteproduit.id_produit = produit.id_produit
        INNER JOIN marque ON produit.id_marque = marque.id_marque
        INNER JOIN commande ON vente.id_commande = commande.id_commande
        INNER JOIN statut ON commande.statut = statut.id_statut
        INNER JOIN client ON commande.id_client = client.id
        INNER JOIN taille ON varianteproduit.id_taille = taille.id_taille
      WHERE vente.est_supprime = 0
        AND client.id = ?
      GROUP BY taille.id_taille
    `;
  
    try {
      db.query(q, [clientId], (error, data) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }
  
        return res.status(200).json(data);
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  
  exports.getRapportRevenu = (req, res) => {
  
    let q = `
        SELECT
        YEAR(date_vente) AS annee,
        (SELECT mois_nom FROM mois WHERE mois_numero = MONTH(date_vente)) AS mois,
        COUNT(*) AS nombre_ventes,
        SUM(prix_unitaire) AS revenu_total,
        AVG(prix_unitaire) AS revenu_moyen_par_vente
      FROM vente
      GROUP BY YEAR(date_vente), MONTH(date_vente)
      ORDER BY YEAR(date_vente), MONTH(date_vente);
    `;
  
    try {
      db.query(q, (error, data) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }
  
        return res.status(200).json(data);
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  
  
  exports.getRapportAchats = (req, res) => {
  
    let q = `
    SELECT varianteproduit.id_varianteProduit, varianteproduit.created_at, produit.nom_produit, varianteproduit.stock,varianteproduit.img, taille_pays.prix, couleur.description, marque.nom AS nom_marque, taille.taille
    FROM varianteproduit
    JOIN produit ON varianteproduit.id_produit = produit.id_produit
      INNER JOIN taille_pays ON varianteproduit.id_taille = taille_pays.id_taille
      INNER JOIN couleur ON varianteproduit.id_couleur = couleur.id_couleur
      INNER JOIN marque ON produit.id_marque = marque.id_marque
      INNER JOIN taille ON taille_pays.id_taille = taille.id_taille
    GROUP BY produit.id_produit, marque.id_marque
    ORDER BY varianteproduit.created_at DESC;
    `;
  
    try {
      db.query(q, (error, data) => {
        if (error) {
          return res.status(500).json({ error: error.message });
        }
  
        return res.status(200).json(data);
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  
  exports.getAchatsTotal = (req, res) => {
    const q = `SELECT SUM(taille_pays.prix) AS montant_total_achats
    FROM taille_pays`;
  
    db.query(q ,(error, data)=>{
      if(error) res.status(500).send(error)
  
      return res.status(200).json(data);
  })
  }
  
exports.getAchatsTotalDuel = (req, res) => {
    const q = `SELECT SUM(taille_pays.stock * taille_pays.prix) AS montant_total_ventes_dues
    FROM taille_pays;`;
  
    db.query(q ,(error, data)=>{
      if(error) res.status(500).send(error)
  
      return res.status(200).json(data);
  })
  }

exports.getVenteTotal = (req, res) => {
    const q = `SELECT SUM(prix_unitaire) AS montant_total_vente
    FROM vente;`;
  
    db.query(q ,(error, data)=>{
      if(error) res.status(500).send(error)
  
      return res.status(200).json(data);
  })
  }