const express = require("express");
const { getDemandeCommande, getDemandeCommandeCount, postDemandeCommande, deleteDemandeCommande, getCommandeCount, getCommande, postCommande, deleteCommande } = require("../controllers/commandeCtrl");
const router = express.Router();

//commande
router.get('/', getCommande)
router.get('/commandeCount', getCommandeCount)
router.post('/commande', postCommande)
router.delete('/commande/:id', deleteCommande)

//Taille Commande
router.get('/detail-commande', getDemandeCommande)
router.get('/detail-commande', getDemandeCommandeCount)
router.post('/detail-commande', postDemandeCommande)
router.delete('/detail-commande/:id', deleteDemandeCommande)



module.exports = router;