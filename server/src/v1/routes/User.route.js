import express from "express";
import {  userController } from "../controllers";
import authMiddleware from "../middlewares/Auth.middleware";

const router = express.Router();
// router.post("/book-meeting", authMiddleware, meetController.bookMeeting);
// router.post("/confirm-meeting", authMiddleware, meetController.confirmMeeting);
// router.post("/reject-meeting", authMiddleware, meetController.rejectMeeting);
// router.get("/get-meetings", authMiddleware, meetController.getMeetings);
// router.get("/get-mentors", authMiddleware, meetController.getmentorsinfo);
// router.get("/my-meetings", authMiddleware, meetController.showbookedMeetings);
router.get("/user-details", authMiddleware, userController.userDetails);
router.get("/getgoals",authMiddleware,userController.getGoals)
router.post("/createassets",authMiddleware,userController.createAssets)
router.get("/createliability",authMiddleware,userController.createLiability)
router.post("/creategoals",authMiddleware,userController.createGoal)
router.get("/getassets",authMiddleware,userController.getassets)



export default router;
