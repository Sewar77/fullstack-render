import { validate } from "../middleware/validate.Middleware.js";
import express from "express"
import { adminOnly } from "../middleware/adminOnly.Middleware.js"
import { protect } from "../middleware/protect.Middleware.js";
import { deletUserByIdController, getAllUsersController, getUserByIdController, updateUserController, updateUserStatusController } from "../controller/user.Controller.js";
import { updateUserSchema } from "../validation/user.Validation.js";
const router = express.Router()

router.get("/user/:id", protect, getUserByIdController)
router.get("/users", protect, adminOnly, getAllUsersController)
router.delete("/user", protect, deletUserByIdController)
router.patch("/user", protect, validate(updateUserSchema), updateUserController)
router.patch("/user/status", protect, adminOnly, updateUserStatusController)
export default router;