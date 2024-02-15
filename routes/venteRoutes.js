const express = require("express");
const { getVente, postVente, deleteVente, putVente, postVenteRetour, getVenteOne, getVenteCount, getRapportVente, getRapportVenteAll, getRapportVenteSearch, getRapportVenteClient, getRapportVenteClientOne } = require("../controllers/venteCtrl");
const router = express.Router();



router.get('/', getVente)
router.get('/venteCount',getVenteCount)
router.get('/:id', getVenteOne)
router.post('/', postVente)
router.post('/retour', postVenteRetour)
router.delete('/:id', deleteVente)
router.put('/:id', putVente)


//Rapport vente
router.get("/rapport/vente", getRapportVente);
router.get("/rapport/venteAll/:id_marque", getRapportVenteAll);
router.get("/rapport/venteAllSearch", getRapportVenteSearch);

//Rapport vente client
router.get("/rapportClient/venteClient", getRapportVenteClient);
router.get("/rapportClient/:clientId", getRapportVenteClientOne);

module.exports = router;