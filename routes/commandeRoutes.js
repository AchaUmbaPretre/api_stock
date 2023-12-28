const express = require("express");
const { getDemandeCommande, getDemandeCommandeCount, postDemandeCommande, deleteDemandeCommande } = require("../controllers/commandeCtrl");
const router = express.Router();



router.get('/', getDemandeCommande)
router.get('/demande-commande', getDemandeCommandeCount)
router.post('/demande-commande', postDemandeCommande)
router.delete('/demande-commande/:id', deleteDemandeCommande)

module.exports = router;