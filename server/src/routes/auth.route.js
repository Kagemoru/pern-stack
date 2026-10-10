import express from "express";
import { register, login, logout, profile } from "../controllers/auth.controller.js"
import authenticate from "../middleware/authenticate.js";
import { authLimiter } from "../middleware/rateLimiter.js"

const router = express.Router();

router.post('/register', authLimiter, register);
router.post('/login', authLimiter, login);
router.post('/logout', authenticate, logout);
router.get('/profile', authenticate, profile);


export default router;