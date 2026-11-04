import { loginRateLimiter } from "../middleware/authRateLimit.Middleware.js";
import { apiLimiter } from "../middleware/rateLimit.Middleware.js";
import { validate } from "../middleware/validate.Middleware.js";
import express from "express"
import { protect } from "../middleware/protect.Middleware.js";
import { createProductController, deleteProductByIdController, getAllProductsController, getProductByIdController, getProductsByCatIdController, getProductsByNameController, updateProductByIdController } from "../controller/products.Controller.js";
import upload from "../middleware/upload.Middleware.js";
const router = express.Router()

router.post("/product", protect, upload.single("image"), createProductController)
router.get("/products", getAllProductsController)
router.get("/product/:id", getProductByIdController)
// should in query be name, page
router.get("/product", getProductsByNameController)
router.get("/category/:id/products", getProductsByCatIdController)
router.put('/product/:id', protect, updateProductByIdController)
router.delete('/product/:id', protect, deleteProductByIdController)
export default router;
// restful api design 