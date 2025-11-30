import express from "express";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { getProductsOfSeller, getProducts, deleteProduct, createProduct } from "../controllers/productController.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.get("/", getProducts)

router.get("/mine", authenticateToken, getProductsOfSeller);
router.delete("/:id", authenticateToken, deleteProduct);

router.post("/", authenticateToken, upload.array("images", 10), createProduct);

export default router;