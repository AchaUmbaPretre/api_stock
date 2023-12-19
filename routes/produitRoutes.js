const express = require("express");
const { getProduit, postProduit, getCouleur, getCategorie, getCategorieOne, postCategorie, deleteCategorie, putCategorie, getEmplacement, getEmplacementOne, postEmplacement, deleteEmplacement, putEmplacement, getMatiere, getMatiereOne, postMatiere, deleteMatiere, putMatiere, getMarque, getMarqueOne, postMarque, deleteMarque, putMarque, getFamille } = require("../controllers/produitCtrl.js");
const router = express.Router();

router.get('/', getProduit)
router.post('/produit', postProduit)

router.get('/couleur', getCouleur);

router.get('/categorie', getCategorie);
router.get('/categorieOne/:id', getCategorieOne);
router.post('/categorie', postCategorie)
router.delete('/categorie/:id', deleteCategorie)
router.put('/categoriePut/:id', putCategorie)

router.get('/emplacement', getEmplacement)
router.get('/emplacementOne/:id', getEmplacementOne)
router.post('/emplacement', postEmplacement)
router.delete('/emplacement/:id', deleteEmplacement)
router.put('/emplacementPut/:id', putEmplacement)

router.get('/matiere', getMatiere)
router.get('/matiereOne/:id', getMatiereOne)
router.post('/matiere', postMatiere)
router.delete('/matiere/:id', deleteMatiere)
router.put('/matiereUpdate/:id', putMatiere)

router.get('/marque', getMarque)
router.get('/marqueOne/:id', getMarqueOne)
router.post('/marque', postMarque)
router.delete('/marque/:id', deleteMarque)
router.put('/marque/:id', putMarque)

router.get('/famille', getFamille)

module.exports = router;