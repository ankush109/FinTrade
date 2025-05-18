import { PrismaClient } from "@prisma/client";
import { customResponse } from "../../../utils/Response";

const prisma = new PrismaClient();

const userController = {
  async getUserMonthlySavings(userId) {
    try {
      const user = await prisma.user.findFirst({ where: { id: userId } });
      if (!user) throw new Error("user not found");

      const expenses = await prisma.expense.findMany({ where: { userId } });
      const totalExpenses = expenses.reduce(
        (acc, val) => acc + parseFloat(val.price),
        0
      );
      console.log(totalExpenses, "total");
      const goals = await prisma.goal.findMany({ where: { userId } });
      const totalGoalsExpense = goals.reduce((acc, val) => {
        const invest = parseFloat(val.invest);
        if (!isNaN(invest)) {
          return acc + invest;
        }
        return acc;
      }, 0);
      console.log(totalGoalsExpense, "totalGoalsExpense");
      const finance = await prisma.finance.findFirst({ where: { userId } });

      const emiAmount = parseFloat(finance?.emiAmmount) || 0;
      const monthlyIncome = parseFloat(finance?.monthlyIncome) || 0;

      const outflow = parseFloat(totalExpenses + totalGoalsExpense + emiAmount);
      console.log(outflow, "outflow");
      return { outflow, inflow: monthlyIncome };
    } catch (err) {
      console.error(err);
      throw err;
    }
  },

  async userDetails(req, res, next) {
    try {
      let user;
      user = await prisma.user.findFirst({
        where: {
          id: req.user.id,
        },
        select: {
          age: true,
          name: true,
          email: true,
          bio: true,
          firstName: true,
          lastName: true,
          role: true,
        },
      });
      const { outflow, inflow } = await userController.getUserMonthlySavings(
        req.user.id
      );
      const budget = await prisma.budget.findFirst({
        where: {
          userId: req.user.id,
        },
      });
      res.json(
        customResponse(200, {
          user: user,
          outflow,
          inflow,
          budget,
        })
      );
    } catch (err) {
      res.json(customResponse(400, err));
      console.log(err, "err");
    }
  },
  async createAssets(req, res, next) {
    try {
      const { type, name, ammount, duration } = req.body;
      const assets = await prisma.assets.create({
        data: {
          userId: req.user.id,
          name: name,

          duration: duration,
          ammount: ammount,
          type: type,
        },
      });
      console.log(assets, "assets");
      res.status(201).json({
        success: true,
        message: assets,
      });
    } catch (err) {
      console.log(err, "err in assets");
      res.status(400).json({
        error: "data not found",
      });
    }
  },
  async createLiability(req, res, next) {
    try {
      const { type, ammount, duration } = req.body;
      const liability = await prisma.liability.create({
        data: {
          userId: req.user.id,
          duration: duration,
          ammount: ammount,
          type: type,
        },
      });
      console.log(liability, "liability");
      res.status(201).json({
        success: true,
        message: liability,
      });
    } catch (err) {
      res.status(400).json({
        error: "data not found",
      });
    }
  },
  async createGoal(req, res, next) {
    try {
      const { name, money, type, investment } = req.body;
      const goal = await prisma.goal.create({
        data: {
          userId: req.user.id,
          name: name,
          money: String(money),
          type: type,
          invest: investment,
        },
      });
      console.log(goal, "liability");
      res.status(201).json({
        success: true,
        message: goal,
      });
    } catch (err) {
      console.log(err, "err in creating goals");
      res.status(400).json({
        error: "data not found",
      });
    }
  },
  async getGoals(req, res, next) {
    try {
      const goal = await prisma.goal.findMany({
        where: {
          userId: req.user.id,
        },
        select: {
          invest: true,
          money: true,
          name: true,
          type: true,
        },
      });
      console.log(goal, "liability");
      res.status(201).json({
        success: true,
        message: goal,
      });
    } catch (err) {
      console.log(err, "err");
      res.status(400).json({
        error: "data not found",
      });
    }
  },
  async getassets(req, res, next) {
    try {
      const assets = await prisma.assets.findMany({
        where: {
          userId: req.user.id,
        },
      });
      console.log(assets, "liability");
      res.status(201).json({
        success: true,
        message: assets,
      });
    } catch (err) {
      console.log(err, "err");
      res.status(400).json({
        error: "data not found",
      });
    }
  },
  async createBudget(req, res, next) {
    try {
      const userId = req.user.id;
      const { money, warnings, upperLimit, lowerLimit } = req.body;
      const budget = await prisma.budget.create({
        data: {
          userId,
          money,
          warnings,
          upperLimit,
          lowerLimit,
        },
      });
      console.log(budget, "buget");
      res.status(201).json({
        success: true,
        message: budget,
      });
    } catch (err) {
      console.log(err, "err in creating budgets");
      res.status(400).json({
        error: err,
      });
    }
  },
};
export default userController;
