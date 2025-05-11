import { PrismaClient } from "@prisma/client";
import { customResponse } from "../../../utils/Response";

const prisma = new PrismaClient();

const userController = {
  async userDetails(req, res, next) {
    try {
      let user;
      user = await prisma.user.findFirst({
        where: {
          id: req.user.id,
        },
      });
      res.json(customResponse(200, user));
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
};
export default userController;
