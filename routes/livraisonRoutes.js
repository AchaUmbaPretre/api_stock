const express = require("express");
const router = express.Router();



router.get("/:id", getInventaire);
router.get("/inventaireTotalOne/:id", getInventaireOne);

module.exports = router;