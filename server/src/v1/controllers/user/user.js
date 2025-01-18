import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { ZodError, z } from "zod";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import ms from "ms";
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
  async getAllQuestionandAnswer(req, res, next) {
    try {
      const questions = await prisma.question.findMany({
        include: {
          answers: {
            include: {
              owner: true,
            },
          },
          user: true,
        },
      });

      if (questions.length === 0) {
        return res.json({
          success: true,
          message: [],
        });
      }

      res.json({
        success: true,
        message: questions,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err });
    }
  },

  async getQuestionOfUser(req, res, next) {
    try {
      const userId = req.user.id;
      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });
      if (user) {
        // fetch all the questions along with theier answer
        const questions = await prisma.question.findMany({
          where: {
            userId: userId,
          },
          include: {
            answers: {
              include: {
                owner: true,
              },
            },
          },
        });
        if (questions) {
          res.json({
            success: true,
            message: questions,
          });
        } else {
          res.json({
            success: true,
            message: "no question found",
          });
        }
      }
    } catch (err) {}
  },
  async deleteQuestion(req, res, next) {
    try {
      const userId = req.user.id;

      if (!userId) {
        res.json({
          message: "User ID is missing or undefined in req.user",
        });
        return;
      }

      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });

      // Check if user exists
      if (!user) {
        res.json({
          message: "User does not exist",
        });
        return;
      }
      console.log(req.params, "request");
      const question = await prisma.question.findFirst({
        where: {
          id: req.params.id,
        },
      });
      console.log(question);

      if (!question) {
        res.json({
          message: "Question does not exist",
        });
        return;
      }

      // Check if the user owns the question
      if (question.userId !== userId) {
        res.json({
          message: "Not the owner of this question",
        });
        return;
      }

      await prisma.question.delete({
        where: {
          id: req.params.id,
        },
      });

      res.json({
        success: true,
        message: "Question deleted successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  async createQuestion(req, res, next) {
    try {
      const { text } = req.body;

      if (!text) {
        return res.status(400).json({ error: "Text field is required." });
      }

      const question = await prisma.question.create({
        data: {
          text: text,
          userId: req.user.id,
        },
      });

      res.status(201).json({
        success: true,
        question,
      });
    } catch (err) {
      console.error(err);

      res.status(500).json({ error: err });
    }
  },
  async answerQuestion(req, res, next) {
    try {
      const { text } = req.body;
      const { questionId } = req.body;
      const userId = req.user.id;

      if (!text) {
        return res.status(400).json({ error: "Text field is required." });
      }

      const existingQuestion = await prisma.question.findUnique({
        where: {
          id: questionId,
        },
      });

      if (!existingQuestion) {
        return res.status(404).json({ error: "Question not found." });
      }

      const answer = await prisma.answer.create({
        data: {
          text: text,
          questionId: questionId,
          userId: userId,
        },
      });

      res.status(201).json({
        success: true,
        answer,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err });
    }
  },
  async createTest(req, res, next) {
    try {
      const userId = req.user.id;
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (user.role !== "Mentor") {
        return res.status(403).json({ error: "Only mentors can create tests" });
      }

      const { title, questions } = req.body;

      const test = await prisma.test.create({
        data: {
          title,
          userId,
          questions: {
            create: questions.map((question) => ({
              text: question.text,
              options: {
                create: question.options.map((option) => ({
                  text: option.text,
                  score: option.score,
                })),
              },
            })),
          },
        },
      });

      res.status(201).json(test);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
  async getAllTests(req, res, next) {
    try {
      const tests = await prisma.test.findMany({
        include: {
          questions: {
            include: {
              options: true,
            },
          },
          mentor: true,
        },
      });

      res.status(200).json(tests);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  async getMyTests(req, res, next) {
    try {
      const userId = req.user.id;
      console.log(userId, "userid");
      const tests = await prisma.test.findMany({
        where: { userId },
        include: {
          questions: {
            include: {
              options: true,
            },
          },
        },
      });

      res.status(200).json(tests);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },

  async deleteTest(req, res, next) {
    try {
      const userId = req.user.id;

      if (!userId) {
        res.json({
          message: "User ID is missing or undefined in req.user",
        });
        return;
      }

      const user = await prisma.user.findFirst({
        where: {
          id: userId,
        },
      });

      if (!user) {
        res.json({
          message: "User does not exist",
        });
        return;
      }

      const test = await prisma.test.findFirst({
        where: {
          id: req.params.id,
        },
      });

      if (!test) {
        res.json({
          message: "Test does not exist",
        });
        return;
      }

      if (test.userId !== userId) {
        res.json({
          message: "Not the owner of this test",
        });
        return;
      }

      await prisma.test.delete({
        where: {
          id: req.params.id,
        },
      });

      res.json({
        success: true,
        message: "Test deleted successfully",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  },
  async createTaskSet(req, res, next) {
    const { name, tasks } = req.body;
    const userId = req.user.id;

    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (user.role !== "Mentor") {
        return res
          .status(403)
          .json({ error: "Only mentors can create task sets" });
      }

      const taskSet = await prisma.taskSet.create({
        data: {
          name,
          tasks: {
            create: tasks.map((task, index) => ({
              title: task.title,
              description: task.description,
              day: index + 1,
              status:"incomplete"
            })),
          },
        },
      });

      res.json(taskSet);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async startTaskSet(req, res, next) {
    const { taskSetId } = req.params;
    const userId = req.user.id;

    try {
      const taskSet = await prisma.taskSet.findUnique({
        where: { id: taskSetId },
      });

      if (!taskSet) {
        return res.status(404).json({ error: "TaskSet not found" });
      }

      const existingUserTaskSet = await prisma.userTaskSet.findFirst({
        where: { userId, taskSetId },
      });

      if (existingUserTaskSet) {
        return res
          .status(400)
          .json({ error: "User has already started this TaskSet" });
      }

      const userTaskSet = await prisma.userTaskSet.create({
        data: {
          userId,
          taskSetId,
          startDate: new Date(),
        },
      });

      res.json(userTaskSet);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async getTaskSet(req, res, next) {
    const { taskSetId } = req.params;
    const userId = req.user.id;

    try {
      const taskSet = await prisma.taskSet.findUnique({
        where: { id: taskSetId },
        include: {
          tasks: true,
        },
      });

      if (!taskSet) {
        return res.status(404).json({ error: "TaskSet not found" });
      }

      const UserTaskSet = await prisma.userTaskSet.findFirst({
        where: { userId, taskSetId },
        include: {
          taskSet: {
            include: {
              tasks: true,
            },
          },
        },
      });

      res.json(UserTaskSet);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async completeTask(req, res, next) {
    const { taskId } = req.params;
    const userId = req.user.id;

    try {
      const task = await prisma.task.findUnique({
        where: { id: taskId },
      });

      if (!task) {
        return res.status(404).json({ error: "Task not found" });
      }

      const userTaskSet = await prisma.userTaskSet.findFirst({
        where: {
          userId,
          taskSetId: task.taskSetId,
        },
      });

      // console.log("ttttttt",userTaskSet);

      if (!userTaskSet) {
        return res
          .status(400)
          .json({ error: "User has not started this TaskSet" });
      }

      const today = new Date();
      const taskDate = new Date(userTaskSet.startDate);
      taskDate.setDate(taskDate.getDate() + task.day - 1);

      if (today.toDateString() !== taskDate.toDateString()) {
        return res.status(400).json({
          error: "This task can only be completed on the assigned day",
        });
      }

      // const existingCompletion = await prisma.taskCompletion.findFirst({
      //   where: { userTaskSetId: userTaskSet.id, taskId },
      // });

      // if (existingCompletion) {
      //   return res.status(400).json({ error: "Task is already completed" });
      // }

      // const taskCompletion = await prisma.taskCompletion.create({
      //   data: {
      //     userTaskSetId: userTaskSet.id,
      //     taskId,
      //     completedAt: new Date(),
      //   },
      // });
 await prisma.task.update({
        where: { id: taskId },
        data: { status: "completed" },
      });
      res.json(task);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async getUserTaskSetProgress(req, res, next) {
    const { taskSetId } = req.params;
    const userId = req.user.id;

    try {
      const userTaskSet = await prisma.userTaskSet.findFirst({
        where: {
          userId,
          taskSetId,
        },
        include: {
          taskSet: {
            include: {
              tasks: true,
            },
          },
          completedTasks: true,
        },
      });

      if (!userTaskSet) {
        return res.status(404).json({ error: "TaskSet not found for user" });
      }

      const completedTasks = userTaskSet.completedTasks.map(
        (task) => task.taskId
      );
      const progress = userTaskSet.taskSet.tasks.map((task) => ({
        ...task,
        completed: completedTasks.includes(task.id),
      }));

      res.json({
        taskSet: userTaskSet.taskSet.name,
        startDate: userTaskSet.startDate,
        progress,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};
export default userController;
