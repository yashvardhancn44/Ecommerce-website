import express from 'express';
// import products from '../data/products.js';
const router = express.Router();
import { createProduct, getProductById, getProducts } from '../controllers/productController.js';
import { protect,admin } from '../middleware/authMiddleware.js';


router.route('/').get(getProducts);
router.route('/:id').get(getProductById);
router.route('/').post(protect, admin, createProduct);

export default router;


