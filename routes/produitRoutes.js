const express = require("express");
const { getProduit, postProduit, getCouleur, getCategorie, getCategorieOne, postCategorie, deleteCategorie, putCategorie, getEmplacement, getEmplacementOne, postEmplacement, deleteEmplacement, putEmplacement, getMatiere, getMatiereOne, postMatiere, deleteMatiere, putMatiere, getMarque, getMarqueOne, postMarque, deleteMarque, putMarque, getFamille, getCible, getProduitOne, getPays, postVariantProduit, getVariantProduit, getVariantProduitFiltrage, getVariantProduitOne, getVariantProduitFiltrageMarque, getVariantProduitFiltrageCible, deleteProduit, getTaille, getTypeMouvement, postTypeMouvement, deleteType_mouvement, putType_mouvement, getMouvement, postMouvement, deleteMouvement, putMouvement, getVariantProduitAll, getMouvementVariante, getCatMouvement, getCodeVariant, getMouvementOne, getProduitCount, getProduitRecement, getCodeVariantProduit, getTailleAll, getVariantProduitFiltrageTaille, deleteVariantProduit, postCouleur, deleteCouleur, getListeVariantProduit } = require("../controllers/produitCtrl.js");
const router = express.Router();

router.get('/', getProduit);
router.get('/produitCount', getProduitCount);
router.get('/produitRecement', getProduitRecement);
router.get('/produit/:id', getProduitOne);
router.post('/produit', postProduit);
router.put('/produitDelete/:id', deleteProduit)

router.get('/CodevarianteProduit', getCodeVariantProduit);
router.get('/Codevariante', getCodeVariant);

router.get('/varianteProduit', getVariantProduit);
router.get('/varianteProduitAll', getVariantProduitAll);
router.get('/listeVarianteProduit', getListeVariantProduit);
router.get('/varianteDetail/:id', getVariantProduitOne);
router.get('/mouvementVariante/:id', getMouvementVariante);
router.get('/varianteFiltre/:id', getVariantProduitFiltrage);
router.get('/varianteFiltreMarque/:id', getVariantProduitFiltrageMarque);
router.get('/varianteFiltreCible/:id', getVariantProduitFiltrageCible);
router.get('/varianteFiltreTaille/:id', getVariantProduitFiltrageTaille);
router.post('/varianteProduit', postVariantProduit);
router.delete('/varianteProduit/:id', deleteVariantProduit);

router.get('/couleur', getCouleur);
router.post('/couleur', postCouleur);
router.delete('/couleur/:id', deleteCouleur);

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

router.get('/cible', getCible)
router.get('/pays', getPays)
router.get('/tailleAll', getTailleAll)

router.get('/tailleOne/:id', getTaille);

router.get('/typeCat', getCatMouvement)

//type des mouvement
router.get('/typeMouvement', getTypeMouvement)
router.post('/typeMouvement', postTypeMouvement)
router.delete('/typeMouvement/:id', deleteType_mouvement)
router.put('/typeMouvement/:id', putType_mouvement)

//mouvement
router.get('/mouvement', getMouvement)
router.get('/mouvement/:id', getMouvementOne)
router.post('/mouvement', postMouvement)
router.delete('/mouvementDelete/:id', deleteMouvement)
router.put('/mouvement/:id', putMouvement)

module.exports = router;