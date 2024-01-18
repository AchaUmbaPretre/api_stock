const express = require("express");
const { getVente, postVente, deleteVente, putVente, postVenteRetour, getVenteOne } = require("../controllers/venteCtrl");
const router = express.Router();



router.get('/', getVente)
router.get('/:id', getVenteOne)
router.post('/', postVente)
router.post('/retour', postVenteRetour)
router.delete('/:id', deleteVente)
router.put('/:id', putVente)

module.exports = router;