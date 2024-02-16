const express = require("express");
const { getCatDepense, postCatDepense, deleteCatDepense, getDepense, postDepense, deleteDepense, depenseTotal } = require("../controllers/depensesCtrl");
const router = express.Router();



router.get('/catDepenses',getCatDepense )
router.post('/catDepenses',postCatDepense)
router.delete('/catDepenses/:id',deleteCatDepense)

router.get('/',getDepense )
router.post('/',postDepense)
router.delete('/:id',deleteDepense)

router.get('/depenseCount',depenseTotal)


module.exports = router;