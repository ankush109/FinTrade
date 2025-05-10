import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
import { ZodError, z } from "zod";
import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import createError from "http-errors";
import ms from "ms";
import { customResponse } from "../../../utils/Response";
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: "AIzaSyDPLfQ1n57GmAEU-Ho1AxK8Kc5vA9xvBhY" || '' });
const prisma = new PrismaClient();
const context = `
You are a helpful assistant that extracts structured expense data from user input or answers finance-related queries.

Extract the expense from the following sentence and return a JSON object with:
- "name": the original description of the expense
- "category": the category of the expense (choose from the list below)
- "price": the numerical value of the expense

Use one of these predefined categories:
- Food & Drinks
- Transportation
- Housing
- Health
- Personal Care
- Bills & Utilities
- Entertainment
- Shopping
- Smoking & Alcohol
- Travel
- Savings & Investments
- Debt & Loans
- Fees & Charges
- Gifts & Donations
- Education
- Pets
- Miscellaneous

If no category matches well, use "Miscellaneous".

Always return a JSON array of one or more such objects (if multiple expenses are mentioned). If there's no price mentioned, return an empty array.

Additionally, if the user input is **not related to expenses** (for example, general questions or queries about the app), return a JSON array with a single object in the following format:

\`\`\`json
[
  {
    "normal": true,
    "answer": "your helpful answer here"
  }
]
\`\`\`

This includes cases like:
- Asking about the weather
- Asking what the app is about
- Discussing finance or money management
- Exploring app features

Examples:
Input: "I ate food for 200"  
Output: [ { "name": "food", "category": "Food & Drinks", "price": 200 } ]

Input: "Bought a shirt for 999 and groceries for 500"  
Output: [ 
  { "name": "shirt", "category": "Shopping", "price": 999 },  
  { "name": "groceries", "category": "Food & Drinks", "price": 500 } 
]

Input: "Nothing spent today"  
Output: []

Input: "What is the weather like today?"  
Output: [
  {
    "normal": true,
    "answer": "I'm here to help with finance tracking. Please check a weather app for real-time updates."
  }
]

Input: "What is this application about?"  
Output: [
  {
    "normal": true,
    "answer": "This is a finance and wealth tracking application. You can track your expenses and income, set financial goals, monitor your progress, consult with financial experts through meetings, engage in a community discussion forum, and explore stocks in the dedicated stock section."
  }
]

Now extract from this input: {{user_input}}
`;


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
  async createFinance(req,res,next){
    try{
     
      const {age,name,majorexp,minorexp,loanammount,profession,salary,loans,emi,savings} = req.body
      console.log(req.user)
      await prisma.user.update({
        where:{
          id:req.user.id
        },
        data:{
          age:age,
          name:name
        }
      })
      const finance = await prisma.finance.create({
        
        data:{
          userId:req.user.id,
          majorExp:majorexp,
          minorExp:minorexp,
          monthlyExp:majorexp+minorexp,
          totalSaving:savings,
          profession:profession,
          monthlyIncome:salary,
          numberofloans:loans,
          loanAmmount:loanammount,
          emiAmmount:emi
        }
      })
      res.status(201).json({
        success: true,
        finance,
      });
      
      } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
      
    }
  },
  async getFinance(req, res, next) {
    try {
      const userId = req.user.id;
      const financeData = await prisma.finance.findFirst({
        where: {
          userId: userId,
        },
      });
  
      if (!financeData) {
        return res.status(400).json({
          error: "Data not found",
        });
      }
  
      // Send the 200 response only if the data is found
      res.status(200).json({
        success: true,
        message: financeData,
      });
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: err.message });
    }
  },
  
  async createAssets(req,res,next){
    try{
      const {type,name,ammount,duration} =req.body
      const assets = await prisma.assets.create({
        data:{
          userId:req.user.id,
          name:name,

          duration:duration,
          ammount:ammount,
          type:type
        }
      })
      console.log(assets,"assets")
      res.status(201).json({
        success:true,
        message:assets
      })
    }catch(err){
      console.log(err,"err in assets")
      res.status(400).json({
        error:"data not found"
         })
       
    }
  },
  async createLiability(req,res,next){
    try{
      const {type,ammount,duration} =req.body
      const liability = await prisma.liability.create({
        data:{
          userId:req.user.id,
          duration:duration,
          ammount:ammount,
          type:type
        }
      })
      console.log(liability,"liability")
      res.status(201).json({
        success:true,
        message:liability
      })
    }catch(err){
      res.status(400).json({
        error:"data not found"
         })
       
    }
  },
  async createGoal(req,res,next){
    try{
      const {name,money,type,investment} =req.body
      const goal = await prisma.goal.create({
        data:{
          userId:req.user.id,
          name:name,
          money:String(money),
          type:type,
          invest:investment
        }
      })
      console.log(goal,"liability")
      res.status(201).json({
        success:true,
        message:goal
      })
    }catch(err){
      console.log(err,"err in creating goals")
      res.status(400).json({
        error:"data not found"
         })
       
    }
  },
  async getGoals(req,res,next){
    try{
      
      const goal = await prisma.goal.findMany({
        where:{
          userId:req.user.id
        }
      })
      console.log(goal,"liability")
      res.status(201).json({
        success:true,
        message:goal
      })
    }catch(err){
      console.log(err,"err")
      res.status(400).json({
        error:"data not found"
         })
       
    }
  },
  async getassets(req,res,next){
    try{
      
      const assets = await prisma.assets.findMany({
        where:{
          userId:req.user.id
        }
      })
      console.log(assets,"liability")
      res.status(201).json({
        success:true,
        message:assets
      })
    }catch(err){
      console.log(err,"err")
      res.status(400).json({
        error:"data not found"
         })
       
    }
  },
  async createUpdateExpense(req, res, next) {
    try {
      const { name, date, price } = req.body; // Extract data from request body
      const userId = req.user.id; // Assume user ID is available in `req.user`
  
      // Extract the month from the provided date
      const month = new Date(date).toLocaleString('default', { month: 'long' });
  
      // Check if an expense for the given month already exists
    
  
      let result;
  

        // Create a new expense if the month does not exist
        result = await prisma.expense.create({
          data: {
            name,
            month,
            date: new Date(date), // Ensure date is a valid Date object
            price,
            userId,
          },
        });
      
  
      res.status(201).json({
        success: true,
        message: result,
      });
    } catch (err) {
      console.log(err, 'Error');
      res.status(400).json({
        success: false,
        error: 'Unable to process the expense',
      });
    }
  },
  async getExpenses(req, res, next) {
    try {
      const expenses = await prisma.expense.findMany({
        where: {
          userId: req.user.id, // Filter by user ID
        },
        orderBy: {
          date: 'desc', // Sort expenses by date in descending order (most recent first)
        },
      });
  
      res.status(200).json({
        success: true,
        message: expenses,
      });
    } catch (err) {
      console.error(err, 'Error');
      res.status(400).json({
        success: false,
        error: 'Unable to retrieve expenses',
      });
    }
  },

  async getAiChats(req, res, next) {
    try {
      const chats = await prisma.chat.findMany({
        where: {
          userId: req.user.id,
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      res.status(200).json({
        success: true,
        message: chats,
      });
    } catch (err) {
      console.error(err, 'Error');
      res.status(400).json({
        success: false,
        error: 'Unable to retrieve chats',
      });
    }
  },

  async createChat(req, res, next) {
    const {chat} = req.body;
    console.log(chat,"chat")
    const user = await prisma.user.findFirst({
      where:{
        id:req.user.id
      }
    })
     const geminiResponse = await ai.models.generateContent({
      model: 'gemini-2.0-flash-001',
      
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: ` ${context} You are a helpful fincance assistant. Answer the question based on the context provided.\nContext: ${chat}\nQuestion: ${chat}`,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 100,
        topP: 0.9,
        topK: 40,
        stopSequences: ['\n'],
      },
    });
    const jsonString = geminiResponse.candidates[0].content.parts[0].text.replace(/```json\n?/, '').replace(/```$/, '').trim();
    console.log(jsonString)
    const parsedJSON = JSON.parse(jsonString);
    if(parsedJSON[0].normal){
      await prisma.chat.create({
        data: {
          userId: req.user.id,
          message: chat,
          role: "user",
        },
      });
      await prisma.chat.create({
        data: {
          userId: req.user.id,
          message: parsedJSON[0].answer,
          role: "assistant",
        },
      });
      return res.status(200).json({
        success: true,
        message: parsedJSON[0].answer,
      });
    }else{
          const expenseSummary = parsedJSON.map(item => `${item.name} of ₹${item.price}`).join(', ');

    const finalResponse = `Got it ${user.name} ! I added ${expenseSummary}.`;

   if(parsedJSON){
    await prisma.expense.createMany({
      data: parsedJSON.map(item => ({
        name: item.name,
        price: item.price,
        category: item.category,
        userId: req.user.id,
        month: new Date().toLocaleString('default', { month: 'long' }),
        date: new Date(),
      })),
    });
    console.log("Data inserted successfully");
   }



    await prisma.chat.create({
     data:{
      userId:req.user.id,
      message:chat,
      role:"user"
     }
    })
    await prisma.chat.create({
      data: {
        userId: req.user.id,
        message: finalResponse,
        role:"assistant",
      },
    });
    console.log(parsedJSON, "parsedJSON");

    return res.status(200).json({
      success: true,
      data: parsedJSON,
      message: finalResponse,
    });
    }
  
   
  }
   
};
export default userController;
