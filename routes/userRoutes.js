const express = require("express");
const router = express.Router();
const { getUser, deleteUser } = require("../controllers/userCtrl");

router.get("/getUser", getUser);
router.delete("/getUser/:id", deleteUser);

module.exports = router;