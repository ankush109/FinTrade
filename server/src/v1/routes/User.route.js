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



export default router;
