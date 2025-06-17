import express from 'express';
import { login, ProfileUpdate, register, UserInfo } from '../services/userServices.js';
import AuthMiddleware from '../Middleware/AuthMiddleware.js';

const router = express.Router();
router.post("/register",register)
router.post("/login",login)
router.get("/user",AuthMiddleware,UserInfo)
router.post("/profile",AuthMiddleware,ProfileUpdate)

export default router;
