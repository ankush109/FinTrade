
import express from "express";
import authMiddleware from "../middlewares/Auth.middleware";
import { FinanceController } from "../controllers/finance/finance";
const router = express.Router();

router.post("/createexpense",authMiddleware,FinanceController.createUpdateExpense)
router.get("/getexpense",authMiddleware,FinanceController.getExpenses)
router.get("/get-expenses-categories",authMiddleware,FinanceController.getCategoriesExpenses)
router.post("/finance/create",authMiddleware,FinanceController.createFinance)
router.get("/getFinance",authMiddleware,FinanceController.getFinance)
export default router;