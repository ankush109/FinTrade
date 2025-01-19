"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createGoal, getmygoals } from "../../../api/goals/index";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

const Comp2: React.FC = () => {
  const { refetch } = getmygoals(); // React Query hook
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to control dialog visibility

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const goalData = {
      name: formData.get("name"),
      money: parseFloat(formData.get("money") as string),
      investment: formData.get("investment"),
      type: formData.get("type"),
    };

    try {
      await createGoal(goalData); // Call API to create goal
      toast.success("Goal created successfully!");
      refetch(); // Refresh goals
      setIsDialogOpen(false); // Close dialog
    } catch (error) {
      console.error("Error creating goal:", error);
      toast.error("Failed to create goal. Please try again.");
      setIsDialogOpen(false); // Close dialog even on failure
    }
  };

  return (
    <div className=" ">
      <div className="bg-white dark:bg-[#1F214A] dark:border-[#1F214A] dark:text-white border-2 border-gray-200 p-4 rounded-lg ">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <div className="flex ">
            <DialogTrigger
              className="bg-blue-600 rounded-md text-white p-2 m-2 justify-end flex"
              onClick={() => setIsDialogOpen(true)}
            >
              Add new Goal
            </DialogTrigger>
          </div>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new Goal</DialogTitle>
            </DialogHeader>
            <div>
              <form
                onSubmit={(e) => {
                  submitForm(e);
                }}
              >
                <div className="mb-5">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Goal Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter your goal"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="money"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Target Amount
                  </label>
                  <input
                    type="number"
                    id="money"
                    name="money"
                    step="0.01"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter the target amount"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="investment"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Monthly Investment Amount
                  </label>
                  <input
                    type="string"
                    id="investment"
                    name="investment"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter the monthly investment amount"
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="type"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Goal Type
                  </label>
                  <select
                    id="type"
                    name="type"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="" disabled>
                      Select type
                    </option>
                    <option value="LONG_TERM">Long Term</option>
                    <option value="SHORT_TERM">Short Term</option>
                  </select>
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                  >
                    Create Goal
                  </button>
                </div>
              </form>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Comp2;
