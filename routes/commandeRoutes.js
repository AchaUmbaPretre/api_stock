const express = require("express");
const { getDemandeCommande, getDemandeCommandeCount, postDemandeCommande, deleteDemandeCommande, getCommandeCount, getCommande, postCommande, deleteCommande, getStatus, putCommande, getCommandeOne, getDemandeCommandeAll, getIdVariantProduit } = require("../controllers/commandeCtrl");
const router = express.Router();

//commande
router.get('/', getCommande)
router.get('/commandeOne/:id', getCommandeOne)
router.get('/commandeCount', getCommandeCount)
router.post('/commandePost', postCommande)
router.put('/commandePut/:id', putCommande)
router.delete('/commande/:id', deleteCommande)

//Status
router.get('/statut', getStatus)

//Taille Commande
router.get('/idVariantproduit/:idCode/:idTaille',getIdVariantProduit)

router.get('/detail-commande', getDemandeCommande)
router.get('/detail-commande/:id', getDemandeCommandeAll)
router.get('/detail-commandeCount', getDemandeCommandeCount)
router.post('/detail-commande', postDemandeCommande)
router.delete('/detail-commande/:id', deleteDemandeCommande)



module.exports = router;