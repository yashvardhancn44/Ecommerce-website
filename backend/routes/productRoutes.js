import express from 'express';
// import products from '../data/products.js';
const router = express.Router();
import { getProductById, getProducts } from '../controllers/productController.js';
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';


router.get(
    '/', 
    asyncHandler(async(req, res)=>{
    const products = await Product.find({});
    res.json(products);
}));

router.get(
    '/:id',
    asyncHandler(async (req,res)=>{
    // const product = products.find((p)=>p._id === req.params.id);
    const product = await Product.findById(req.params.id);
    if(product){
       return res.json(product);
    }else{
        res.status(404);
        throw new Error('Resource Not found');
    }    
})
);


export default router;


