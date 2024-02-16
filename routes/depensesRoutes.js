const express = require("express");
const { getCatDepense, postCatDepense, deleteCatDepense, getDepense, postDepense, deleteDepense } = require("../controllers/depensesCtrl");
const router = express.Router();



router.get('/catDepenses',getCatDepense )
router.post('/catDepenses',postCatDepense)
router.delete('/catDepenses/:id',deleteCatDepense)

router.get('/',getDepense )
router.post('/',postDepense)
router.delete('/:id',deleteDepense)


module.exports = router;