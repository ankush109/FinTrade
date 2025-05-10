import express from "express";
import { meetController, userController } from "../controllers";
import authMiddleware from "../middlewares/Auth.middleware";

const router = express.Router();
router.post("/book-meeting", authMiddleware, meetController.bookMeeting);
router.post("/confirm-meeting", authMiddleware, meetController.confirmMeeting);
router.post("/reject-meeting", authMiddleware, meetController.rejectMeeting);
router.get("/get-meetings", authMiddleware, meetController.getMeetings);
router.get("/get-mentors", authMiddleware, meetController.getmentorsinfo);
router.get("/my-meetings", authMiddleware, meetController.showbookedMeetings);
router.get("/user-details", authMiddleware, userController.userDetails);
router.post("/create-question", authMiddleware, userController.createQuestion);
router.post("/answer-question", authMiddleware, userController.answerQuestion);
router.get("/user-questions", authMiddleware, userController.getQuestionOfUser);
router.get("/get-allquestions", userController.getAllQuestionandAnswer);
router.delete(
  "/delete-question/:id",
  authMiddleware,
  userController.deleteQuestion
);
router.post("/finance/create",authMiddleware,userController.createFinance)
router.get("/getFinance",authMiddleware,userController.getFinance)
router.get("/getgoals",authMiddleware,userController.getGoals)
router.post("/createassets",authMiddleware,userController.createAssets)
router.get("/createliability",authMiddleware,userController.createLiability)
router.post("/creategoals",authMiddleware,userController.createGoal)
router.get("/getassets",authMiddleware,userController.getassets)
router.post("/createexpense",authMiddleware,userController.createUpdateExpense)
router.get("/getexpense",authMiddleware,userController.getExpenses)
router.post("/create-expense",authMiddleware,userController.createChat)
router.get("/get-ai-chats"  ,authMiddleware,userController.getAiChats)

export default router;
