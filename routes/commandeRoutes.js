const express = require("express");
const { getDemandeCommande, getDemandeCommandeCount, postDemandeCommande, deleteDemandeCommande, getCommandeCount, getCommande, postCommande, deleteCommande } = require("../controllers/commandeCtrl");
const router = express.Router();

router.get('/demande-commande', getDemandeCommande)
router.get('/demande-commande', getDemandeCommandeCount)
router.post('/demande-commande', postDemandeCommande)
router.delete('/demande-commande/:id', deleteDemandeCommande)

//commande
router.get('/', getCommandeCount)
router.get('/commande', getCommande)
router.post('/commande', postCommande)
router.delete('/commande/:id', deleteCommande)


module.exports = router;