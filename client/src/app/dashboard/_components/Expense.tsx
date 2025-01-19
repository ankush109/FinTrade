"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { createExpense, getmyexpense } from "../../../api/goals/index";
import {getMyfinance } from "../../../api/finance/index";
import Lottie from "react-lottie-player";
import lo2 from "../../../assets/./1.json";
import  lottieJson from "../../../assets/./2.json";
import toast from "react-hot-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import StatCard from "./statecard";

const Expense: React.FC = () => {
  const [expenses, setExpenses] = useState(" ");
  const [loading, setLoading] = useState(true); // Loading state
  const [creating, setCreating] = useState(false); // Loader for create expense
  const [dialogOpen, setDialogOpen] = useState(false); // Manage dialog open state
  const res = getmyexpense();
   const { data } = getMyfinance()

  const submitForm = async (e) => {
    e.preventDefault();
    setCreating(true); // Start creating loader
    const formData = new FormData(e.target);

    const assetData = {
      name: formData.get("name"),
      price: parseFloat(formData.get("price")), // Ensure price is a number
      date: new Date().toISOString(), // Use current date in ISO format
    };

    try {

       const result = await createExpense(assetData)
       if (result.success){
        toast.success('expense created!')
         res.refetch()
        setDialogOpen(false); // Close the dialog
       }
        
       
 
    } catch (error) {
      console.error("Error creating expense:", error);
      toast.error("An error occurred while creating the expense.");
    } finally {
      setCreating(false); // Stop creating loader
    }
  };
  useEffect(()=>{
    const totalExpense = res?.data?.message?.reduce((acc, expense) => {
      return acc + expense.price;
    }, 0).toFixed(2);
    setExpenses(totalExpense)
  },[res.data])
  return (
    <div className="p-6">
  <div className="bg-white dark:bg-[#1F214A] dark:border-[#1F214A] dark:text-white border-2 border-gray-200 p-6 rounded-lg shadow-md">
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger asChild>
        <button
          className="px-3 py-1 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
          onClick={() => setDialogOpen(true)}
        >
          {creating ? "Creating..." : "Create a new Expense"}
        </button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-700 dark:text-white">
            Create Expense
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
            Fill out the details below to create a new expense.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={submitForm} className="mt-4 space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Expense Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-[#1F214A] dark:border-gray-600 dark:text-white"
              placeholder="Enter expense name (e.g., Food, Rent)"
            />
          </div>

          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
            >
              Amount
            </label>
            <input
              type="number"
              id="price"
              name="price"
              step="0.01"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-[#1F214A] dark:border-gray-600 dark:text-white"
              placeholder="Enter the amount (e.g., 500.50)"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              {creating ? "Creating..." : "Create Expense"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>

    <div className="flex mt-6 gap-6">
      {/* Lottie Animation */}
      <div className="flex-shrink-0">
        <Lottie
          loop
          animationData={lottieJson}
          play
          style={{ width: 250, height: 250 }}
        />
      </div>

      {/* StatCard */}
     <div className="flex flex-col gap-5">
     <div className="flex-grow">
        <StatCard
          title="January Expenses"
          value={expenses?.toString()}
          change="13%"
          isPositive={true}
          comparisonText="Compared to last month"
        />
      </div>
      <div className="flex-grow">
        <StatCard
          title="Savings this month"
          value={data?.message?.monthlyIncome.toString()-expenses?.toString()}
          change="13%"
          isPositive={true}
          comparisonText="Compared to last month"
        />
      </div>
     </div>

      {/* Table */}
      <div className="flex-grow bg-white dark:bg-[#1F214A] rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
        {!res?.data?.message ? (
          <p className="text-gray-700 dark:text-gray-300 p-4">
            Loading expenses...
          </p>
        ) : (
          <>
            {/* Fixed Header */}
            <div className="sticky top-0 bg-gray-100 dark:bg-gray-800 z-10 rounded-t-lg">
              <Table className="w-full text-left border-collapse">
                <TableHeader>
                  <TableRow>
                    <TableHead className="px-6 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">
                      Name
                    </TableHead>
                    
                    <TableHead className="px-6 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">
                      Date
                    </TableHead>
                    <TableHead className="px-6 py-3 text-sm font-semibold text-gray-600 dark:text-gray-300">
                      Price
                    </TableHead>
                  </TableRow>
                </TableHeader>
              </Table>
            </div>

            {/* Scrollable Content */}
            <div className="max-h-64 overflow-y-auto">
              <Table className="w-full text-left border-collapse">
                <TableBody>
                  {res?.data?.message.map((expense) => (
                    <TableRow
                      key={expense.id}
                      className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    >
                      <TableCell className="px-6 py-3 text-gray-700 dark:text-gray-300">
                        {expense.name}
                      </TableCell>
                     
                      <TableCell className="px-6 py-3 text-gray-700 dark:text-gray-300">
                        {new Date(expense.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="px-6 py-3 text-gray-700 dark:text-gray-300">
                        ₹ {expense.price.toFixed(2)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </>
        )}
      </div>
    </div>
  </div>
</div>

  );
};

export default Expense;
