const express = require("express");
const { getClient, getClientCount, postClient, deleteClient, putClient, getClientOne } = require("../controllers/clientCtrl");
const router = express.Router();



router.get('/', getClient)
router.get('/:id', getClientOne)
router.get('/clientCount/count', getClientCount)
router.post('/client', postClient)
router.put('/clientDelete/:id', deleteClient)
router.put('/client/:id', putClient)


module.exports = router;