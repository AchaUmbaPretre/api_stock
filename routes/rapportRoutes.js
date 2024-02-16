const express = require("express");
const { getRapportVente, getRapportVenteAll, getRapportVenteSearch, getRapportVenteClient, getRapportVenteClientOne, getRapportRevenu, getRapportAchats, getAchatsTotal, getAchatsTotalDuel, getVenteTotal, getAchatsMois, getVenteMois } = require("../controllers/rapportCtrl");
const router = express.Router();

//Rapport vente
router.get("/rapport/vente", getRapportVente);
router.get("/rapport/venteAll/:id_marque", getRapportVenteAll);
router.get("/rapport/venteAllSearch", getRapportVenteSearch);

//Rapport vente client
router.get("/rapportClient/venteClient", getRapportVenteClient);
router.get("/rapportClient/:clientId", getRapportVenteClientOne);
router.get("/rapportRevenu/revenu", getRapportRevenu)
router.get("/rapportAchats/achats", getRapportAchats)

//Achats total
router.get("/achatsTotal/total", getAchatsTotal)
router.get("/achatsTotalDuel/total", getAchatsTotalDuel)
router.get("/venteTotal/total", getVenteTotal)

//Rapport du mois
router.get("/rapportAchatsMois/total", getAchatsMois)
router.get("/rapportVenteMois/total", getVenteMois)


module.exports = router;