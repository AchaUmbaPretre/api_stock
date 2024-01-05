const express = require("express");
const { getLivraison, getLivraisonOne, postLivraison, deleteLivraison } = require("../controllers/livraisonCtrl");
const router = express.Router();



router.get("/", getLivraison);
router.get("/livraisonOne/:id", getLivraisonOne);
router.post("/", postLivraison);
router.delete("/livraisonDelete/:id", deleteLivraison);

module.exports = router;