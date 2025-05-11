const { PrismaClient } = require("@prisma/client");
const {
  botAi,
  botContext,
  generateFinanceBotPrompt,
} = require("../../../lib/lib");
const { parseGeminiResponse } = require("../../../utils/func-utils");
const prisma = new PrismaClient();

const botController = {
  async getBotChatHistory(req, res, next) {
    try {
      const chats = await prisma.chat.findMany({
        where: {
          userId: req.user.id,
        },
        orderBy: {
          createdAt: "asc",
        },
      });

      res.status(200).json({
        success: true,
        message: chats,
      });
    } catch (err) {
      console.error("Error retrieving chats:", err);
      res.status(400).json({
        success: false,
        error: "Unable to retrieve chats",
      });
    }
  },

  async createChat(req, res, next) {
    try {
      const { chat } = req.body;
      if (!chat) {
        return res
          .status(400)
          .json({ success: false, error: "Chat message is required" });
      }

      const user = await prisma.user.findFirst({ where: { id: req.user.id } });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: "User not found" });
      }
      const userId = req.user.id;
      const finances = await prisma.finance.findFirst({
        where: {
          userId: userId,
        },
      });
      const expensesUser = await prisma.expense.findFirst({
        where: {
          userId: userId,
        },
      });
      const chatHistory = await prisma.chat.findMany({
        where: {
          userId,
        },
      });
      const geminiResponse = await botAi.models.generateContent({
        model: "gemini-2.0-flash-001",
        contents: [
          {
            role: "user",
            parts: [
              {
                text: generateFinanceBotPrompt({
                  botContext,
                  finances,
                  chatHistory,
                  chat,
                }),
              },
            ],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 300,
          topP: 0.9,
          topK: 40,
        },
      });

      const geminiText =
        geminiResponse.candidates?.[0]?.content?.parts?.[0]?.text;
      const parsed = parseGeminiResponse(geminiText);

      if (!parsed) {
        return res
          .status(500)
          .json({ success: false, error: "Failed to parse AI response" });
      }

      if (parsed[0]?.normal) {
        await prisma.chat.createMany({
          data: [
            { userId: req.user.id, message: chat, role: "user" },
            {
              userId: req.user.id,
              message: parsed[0].answer,
              role: "assistant",
            },
          ],
        });

        return res.status(200).json({
          success: true,
          message: parsed[0].answer,
        });
      }

      // Handle expense data case
      const expenses = parsed;
      const summary = expenses
        .map((item) => `${item.name} of ₹${item.price}`)
        .join(", ");
      const finalResponse = `Got it ${user.name}! I added ${summary}.`;

      await prisma.expense.createMany({
        data: expenses.map((item) => ({
          name: item.name,
          price: item.price,
          category: item.category,
          userId: req.user.id,
          month: new Date().toLocaleString("default", { month: "long" }),
          date: new Date(),
        })),
      });

      await prisma.chat.createMany({
        data: [
          { userId: req.user.id, message: chat, role: "user" },
          { userId: req.user.id, message: finalResponse, role: "assistant" },
        ],
      });

      return res.status(200).json({
        success: true,
        message: finalResponse,
        data: expenses,
      });
    } catch (err) {
      console.error("Error in createChat:", err);
      res.status(500).json({
        success: false,
        error: "Something went wrong processing your request.",
      });
    }
  },
};

module.exports = { botController };
