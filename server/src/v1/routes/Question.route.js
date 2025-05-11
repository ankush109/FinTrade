



import express from "express";
import authMiddleware from "../middlewares/Auth.middleware";
import { QuestionController } from "../controllers/questions";

const router = express.Router();

router.post("/create-question", authMiddleware, QuestionController.createQuestion);
router.post("/answer-question", authMiddleware, QuestionController.answerQuestion);
router.get("/user-questions", authMiddleware, QuestionController.getQuestionOfUser);
router.get("/get-allquestions", QuestionController.getAllQuestionandAnswer);
router.delete(
  "/delete-question/:id",
  authMiddleware,
  QuestionController.deleteQuestion
);

export default router;