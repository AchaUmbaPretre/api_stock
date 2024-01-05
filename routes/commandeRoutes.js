const express = require("express");
const { getDemandeCommande, getDemandeCommandeCount, postDemandeCommande, deleteDemandeCommande, getCommandeCount, getCommande, postCommande, deleteCommande, getStatus, putCommande } = require("../controllers/commandeCtrl");
const router = express.Router();

//commande
router.get('/', getCommande)
router.get('/commandeCount', getCommandeCount)
router.post('/commandePost', postCommande)
router.put('/commandePut', putCommande)
router.delete('/commande/:id', deleteCommande)

//Status
router.get('/statut', getStatus)


//Taille Commande
router.get('/detail-commande', getDemandeCommande)
router.get('/detail-commandeCount', getDemandeCommandeCount)
router.post('/detail-commande', postDemandeCommande)
router.delete('/detail-commande/:id', deleteDemandeCommande)



module.exports = router;