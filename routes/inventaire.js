const express = require("express");
const { getInventaire } = require("../controllers/inventaire");
const router = express.Router();



router.get("/inventaire", getInventaire);

module.exports = router;