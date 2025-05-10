import express from "express";
import { userController } from "../controllers";
import authMiddleware from "../middlewares/Auth.middleware";
import { botController } from "../controllers/bot";

const router = express.Router();
router.post("/create-expense",authMiddleware,botController.createChat)
router.get("/get-ai-chats"  ,authMiddleware,botController.getAiChats)


export default router;