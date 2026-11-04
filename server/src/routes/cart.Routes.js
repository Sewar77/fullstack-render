import express from "express";
import {
  addToCart,
  checkOutCart,
  decreaseQuantityController,
  getCartbyUserController,
  increaseQuantityController,
} from "../controller/cart.Controller.js";
import { protect } from "../middleware/protect.Middleware.js";
const router = express.Router();
router.post("/cart/items", protect, addToCart);
router.get("/cart", protect, getCartbyUserController);
router.put(
  "/products/:productId/decrease",
  protect,
  decreaseQuantityController,
);
router.put(
  "/products/:productId/increase",
  protect,
  increaseQuantityController,
);
router.post('/order/checkout', protect, checkOutCart)
export default router;
