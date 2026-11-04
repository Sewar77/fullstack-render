import { createUserController, loginController, logout, me, refreshController } from "../controller/auth.Controller.js";
import { loginRateLimiter } from "../middleware/authRateLimit.Middleware.js";
import { protect } from "../middleware/protect.Middleware.js";
import { apiLimiter } from "../middleware/rateLimit.Middleware.js";
import { validate } from "../middleware/validate.Middleware.js";
import { createUserSchema, loginSchema } from "../validation/auth.Validation.js";
import express from "express"
const router = express.Router()


router.post("/auth/register", validate(createUserSchema), createUserController)
router.post("/auth/login", validate(loginSchema), loginController)
router.post("/auth/refresh", refreshController)

// /only logout and me is get
router.get("/auth/me", protect, me)
router.get("/auth/logout", protect, logout)

export default router
