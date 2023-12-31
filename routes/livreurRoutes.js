const express = require('express');
const { getLivreurCount, getLivreur, postLivreur, deleteLivreur, putLivreur } = require("../controllers/livreurCtrl");
const router = express.Router();


router.get('/', getLivreur);
router.get('/livreurCount', getLivreurCount);
router.post('/', postLivreur);
router.delete('/:id', deleteLivreur);
router.put('/putLivreur/:id',putLivreur);

module.exports = router;