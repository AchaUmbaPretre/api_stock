const express = require("express");
const { getVente, postVente, deleteVente, putVente } = require("../controllers/venteCtrl");
const router = express.Router();



router.get('/', getVente)
router.post('/', postVente)
router.delete('/:id', deleteVente)
router.put('/:id', putVente)

module.exports = router;