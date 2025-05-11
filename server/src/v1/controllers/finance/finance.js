
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const FinanceController = {

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
          userId: req.user.id, 
        },
        orderBy: {
          date: 'desc', 
        },
      });
  console.log(expenses, 'expenses');
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
   async getCategoriesExpenses(req, res, next) {
  try{
    const expenses = await prisma.expense.findMany({
      where: {
        userId: req.user.id,
      },
     
      orderBy: {
        date: 'desc',
      },
    });
    return res.status(200).json({
      success: true,
      message: expenses,
    });


  }catch(err){
    console.log(err, 'Error');
    res.status(400).json({
      success: false,
      error: 'Unable to retrieve expenses',
    });

  }
 },

}