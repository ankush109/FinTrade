"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Lottie from "react-lottie-player";
import lottieJson from "../../../assets/2.json";
import toast from "react-hot-toast";
import StatCard from "./statecard";
import { useGetUserExpenseQuery } from "@/hooks/query/useGetUserExpenses";

import { useCreateExpenseMutation } from "@/hooks/mutation/useCreateExpenseMutation";
import { useGetUserFinanceQuery } from "@/hooks/query/useGetUserFinanceQuery";

const Expense: React.FC = () => {
  const { mutate: createExpense } = useCreateExpenseMutation();
  const expensesQuery = useGetUserExpenseQuery();
  const financeQuery = useGetUserFinanceQuery();

  const [creating, setCreating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const totalExpense = useMemo(() => {
    const expenses = expensesQuery?.data?.message || [];
    return expenses.reduce((sum, e) => sum + e.price, 0).toFixed(2);
  }, [expensesQuery.data]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreating(true);

    const formData = new FormData(e.currentTarget);
    const expense = {
      name: formData.get("name") as string,
      price: parseFloat(formData.get("price") as string),
      date: new Date().toISOString(),
    };

    createExpense(expense, {
      onSuccess: () => {
        toast.success("Expense created successfully!");
        expensesQuery.refetch();
        setDialogOpen(false);
      },
      onError: () => {
        toast.error("Failed to create expense.");
      },
      onSettled: () => {
        setCreating(false);
      },
    });
  };

  const savings = useMemo(() => {
    const income = financeQuery?.data?.message?.monthlyIncome || 0;
    return (income - parseFloat(totalExpense)).toFixed(2);
  }, [financeQuery.data, totalExpense]);

  return (
    <div className="p-5">
      <div className="bg-white dark:bg-[#1F214A] border-2 p-5 rounded-lg shadow-md dark:border-[#1F214A] dark:text-white">
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <button
              onClick={() => setDialogOpen(true)}
              className="px-3 py-1 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
            >
              {creating ? "Creating..." : "Create a new Expense"}
            </button>
          </DialogTrigger>

          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">
                Create Expense
              </DialogTitle>
              <DialogDescription>
                Fill out the details below to create a new expense.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              <InputField
                label="Expense Name"
                name="name"
                type="text"
                placeholder="Enter expense name (e.g., Food)"
              />
              <InputField
                label="Amount"
                name="price"
                type="number"
                step="0.01"
                placeholder="Enter the amount (e.g., 500.50)"
              />
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
          <div className="flex-shrink-0">
            <Lottie
              loop
              play
              animationData={lottieJson}
              style={{ width: 250, height: 250 }}
            />
          </div>

          <div className="flex flex-col gap-5">
            <StatCard
              not={false}
              title="January Expenses"
              value={totalExpense}
              change="13%"
              isPositive
              comparisonText="Compared to last month"
            />
            <StatCard
              not={false}
              title="Savings this month"
              value={savings}
              change="13%"
              isPositive
              comparisonText="Compared to last month"
            />
          </div>

          <div className="flex-grow bg-white dark:bg-[#1F214A] rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
            {!expensesQuery?.data?.message ? (
              <p className="p-4 text-gray-700 dark:text-gray-300">
                Loading expenses...
              </p>
            ) : (
              <>
                <div className="sticky top-0 bg-gray-100 dark:bg-gray-800 z-10 rounded-t-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Price</TableHead>
                      </TableRow>
                    </TableHeader>
                  </Table>
                </div>

                <div className="max-h-64 overflow-y-auto">
                  <Table>
                    <TableBody>
                      {expensesQuery.data.message.map((expense) => (
                        <TableRow
                          key={expense.id}
                          className="hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <TableCell>{expense.name}</TableCell>
                          <TableCell>
                            {new Date(expense.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell>₹ {expense.price.toFixed(2)}</TableCell>
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

const InputField = ({ label, name, type, placeholder, step }: any) => (
  <div>
    <label
      htmlFor={name}
      className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
    >
      {label}
    </label>
    <input
      id={name}
      name={name}
      type={type}
      step={step}
      required
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-[#1F214A] dark:border-gray-600 dark:text-white"
    />
  </div>
);

export default Expense;
