const express = require("express");
const { getInventaire } = require("../controllers/inventaire");
const router = express.Router();



router.get("/", getInventaire);

module.exports = router;