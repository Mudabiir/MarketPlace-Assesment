import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { getProductsOfSeller, getProducts, deleteProduct } from "../controllers/productController.js";

const router = express.Router();

router.get("/", getProducts)

router.get("/mine", authenticateToken, getProductsOfSeller);
router.delete("/:id", authenticateToken, deleteProduct);

export default router;