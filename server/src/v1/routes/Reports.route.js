import express from "express";

import authMiddleware from "../middlewares/Auth.middleware";

import { reportController } from "../controllers/reports/reports";

const router = express.Router();
router.post(
  "/generate-report",
  authMiddleware,
  reportController.generateReport
);

export default router;
