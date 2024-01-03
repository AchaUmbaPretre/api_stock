const express = require("express");
const { getDemandeCommande, getDemandeCommandeCount, postDemandeCommande, deleteDemandeCommande, getCommandeCount, getCommande, postCommande, deleteCommande } = require("../controllers/commandeCtrl");
const router = express.Router();

router.get('/detail-commande', getDemandeCommande)
router.get('/detail-commande', getDemandeCommandeCount)
router.post('/detail-commande', postDemandeCommande)
router.delete('/detail-commande/:id', deleteDemandeCommande)

//commande
router.get('/', getCommandeCount)
router.get('/commande', getCommande)
router.post('/commande', postCommande)
router.delete('/commande/:id', deleteCommande)


module.exports = router;