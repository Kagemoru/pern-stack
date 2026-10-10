import express from "express";
import { register, login, logout, profile } from "../controllers/auth.controller.js"
import authenticate from "../middleware/authenticate.js";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authenticate, logout);
router.get('/profile', authenticate, profile);


export default router;