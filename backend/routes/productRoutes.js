import express from 'express';
// import products from '../data/products.js';
const router = express.Router();
import { getProductById, getProducts } from '../controllers/productController.js';


router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

export default router;


