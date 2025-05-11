import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const QuestionController = {
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
};
