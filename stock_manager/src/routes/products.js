
const { Router } = require('express');
const { getAllProducts,getProductsById,createProducts } = require('../controllers/products');

const router = Router();

router.get('/', getAllProducts);
router.get('/:id', getProductsById);
router.post('/', createProducts);


module.exports = router;



