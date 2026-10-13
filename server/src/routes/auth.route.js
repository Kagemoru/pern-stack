import express from "express";
import authenticate from "../middleware/authenticate.js";
import { authLimiter } from "../middleware/rateLimiter.js";
import {
  register,
  login,
  logout,
  profile,
} from "../controllers/auth.controller.js";
import {
  requestPasswordReset,
  verifyPasswordResetCode,
  resetPassword,
} from "../controllers/passwordReset.controller.js";

const router = express.Router();

router.post("/register", authLimiter, register);
router.post("/login", authLimiter, login);
router.post("/logout", authenticate, logout);
router.get("/profile", authenticate, profile);

router.post("/forgot-password", authLimiter, requestPasswordReset);
router.post("/verify-reset-code", authLimiter, verifyPasswordResetCode);
router.post("/reset-password", authLimiter, resetPassword);

export default router;
