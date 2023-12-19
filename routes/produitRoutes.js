const express = require("express");
const { getProduit } = require("../controllers/produitCtrl.js");
const router = express.Router();

router.get('/', getProduit)

module.exports = router;