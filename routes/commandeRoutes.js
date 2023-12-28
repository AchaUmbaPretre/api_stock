const express = require("express");
const { getDemandeCommande, getDemandeCommandeCount, postDemandeCommande, deleteDemandeCommande } = require("../controllers/commandeCtrl");
const { getProduit } = require("../controllers/produitCtrl");
const router = express.Router();



router.get('/', getDemandeCommande)
router.get('/demande-commande', getDemandeCommandeCount)
router.post('/client', postDemandeCommande)
router.delete('/clientDelete/:id', deleteDemandeCommande)

module.exports = router;