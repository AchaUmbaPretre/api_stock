const express = require("express");
const { getLivraison, getLivraisonOne, postLivraison, deleteLivraison, getLivraisonDetail, getLivraisonDetailOne, postLivraisonDetail, deleteLivraisonDetail } = require("../controllers/livraisonCtrl");
const router = express.Router();



router.get("/", getLivraison);
router.get("/livraisonOne/:id", getLivraisonOne);
router.post("/", postLivraison);
router.delete("/livraisonDelete/:id", deleteLivraison);

//Detail livraison
router.get("/livraisonDetail", getLivraisonDetail);
router.get("/livraisonDetailOne/:id", getLivraisonDetailOne);
router.post("/livraisonDetail", postLivraisonDetail);
router.delete("/livraisonDelete/:id", deleteLivraisonDetail);


module.exports = router;