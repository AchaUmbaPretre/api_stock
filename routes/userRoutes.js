const express = require("express");
const router = express.Router();
const { getUser, deleteUser, getUserOne, putUser } = require("../controllers/userCtrl");

router.get("/getUser", getUser);
router.get("/getUserOne/:id", getUserOne);
router.delete("/getUser/:id", deleteUser);
router.put("/getUser/:id", putUser);

module.exports = router;