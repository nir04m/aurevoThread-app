import express from 'express';
import { getAllProducts, getFeaturedProducts, createProduct, deleteProduct, getRecommendedProducts } from '../controllers/productController.js';
import { protectRoute, adminRoute } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', protectRoute, adminRoute, getAllProducts);
router.get('/featured', getFeaturedProducts);
router.get('/recommendations', getRecommendedProducts);
router.post('/', protectRoute, adminRoute, createProduct);
router.delete('/:id', protectRoute, adminRoute, deleteProduct);

export default router;