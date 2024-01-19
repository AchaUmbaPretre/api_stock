const express = require("express");
const { getLivraison, getLivraisonOne, postLivraison, deleteLivraison, getLivraisonDetail, getLivraisonDetailOne, postLivraisonDetail, deleteLivraisonDetail, getLivraisonUser, getLivraisonUserDetail, putLivraisonVuLivreur, getLivraisonUserOne } = require("../controllers/livraisonCtrl");
const router = express.Router();



router.get("/", getLivraison);
router.get("/livraisonOne/:id", getLivraisonOne);
router.post("/", postLivraison);
router.delete("/livraisonDelete/:id", deleteLivraison);

//Detail livraison
router.get("/livraisonDetail", getLivraisonDetail);
router.get("/livraisonDetailOne/:id", getLivraisonDetailOne);
router.post("/livraisonDetail", postLivraisonDetail);
router.delete("/livraisonDeleteDetail/:id", deleteLivraisonDetail);

//livraison utilisateur
router.get("/livraison-user/:id",getLivraisonUser)
router.get("/livraison-userOne/:id",getLivraisonUserOne)
router.get("/livraison-user-detail/:id",getLivraisonUserDetail)

router.put("/vuLivreur/:id",putLivraisonVuLivreur)


module.exports = router;