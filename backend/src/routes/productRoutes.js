import express from 'express';
import { createProduct, getProducts, getProductsOfSeller } from '../controllers/productController.js';
import { upload } from '../middlewares/multer.js';
import { authenticateToken } from '../middlewares/authMiddleware.js';

const router = express.Router();
router
    .post("/", authenticateToken, upload.array("images", 10), createProduct)
    .get("/", getProducts)
router.get("/:userId", authenticateToken, getProductsOfSeller);



export default router;