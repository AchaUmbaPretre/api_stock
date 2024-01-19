const express = require("express");
const { getClient, getClientCount, postClient, deleteClient, putClient, getProvince, getCommune, getClientOne } = require("../controllers/clientCtrl");
const router = express.Router();



router.get('/', getClient)
router.get('/:id', getClientOne)
router.get('/clientCount', getClientCount)
router.post('/client', postClient)
router.put('/clientDelete/:id', deleteClient)
router.put('/client/:id', putClient)

router.get('/province', getProvince)
router.get('/commune/:id', getCommune)

module.exports = router;