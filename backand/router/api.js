import express from 'express';
import { login, ProfileUpdate, register, UserInfo } from '../services/userServices.js';
import AuthMiddleware from '../Middleware/AuthMiddleware.js';
import { KanbanBoardGet, KanbanBoardPost } from '../services/KanbanBoardService.js';
import { upload } from '../Middleware/MulterMiddleware.js';

const router = express.Router();
router.post("/register",register)
router.post("/login",login)
router.get("/user",AuthMiddleware,UserInfo)
router.post("/profile",AuthMiddleware,upload.single("file"),ProfileUpdate)
router.post("/kanban",AuthMiddleware,KanbanBoardPost)
router.get("/kanbanGet",AuthMiddleware,KanbanBoardGet)


export default router;
