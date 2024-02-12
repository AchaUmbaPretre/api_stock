const express = require("express");
const { getVente, postVente, deleteVente, putVente, postVenteRetour, getVenteOne, getVenteCount, getRapportVente } = require("../controllers/venteCtrl");
const router = express.Router();



router.get('/', getVente)
router.get('/venteCount',getVenteCount)
router.get('/:id', getVenteOne)
router.post('/', postVente)
router.post('/retour', postVenteRetour)
router.delete('/:id', deleteVente)
router.put('/:id', putVente)

router.get("/rapport/vente", getRapportVente);

module.exports = router;