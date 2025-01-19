"use client"
import React from "react";

import { useTheme } from "../../../context/ThemeContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { LinearProgressBar } from "react-percentage-bar";
import  { createGoal} from "../../../api/goals/index"
import Comp3 from "./comp3";
const Comp2: React.FC = () => {
 const submitForm = (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const goalData = {
    name: formData.get("name"),
    money: parseFloat(formData.get("money")),
    investment:formData.get("investment"),
    type: formData.get("type"),
  };
  console.log(goalData)
   createGoal(goalData)
 
 }
  return (
    <div className="w-1/2 ">
    
      <div className="bg-white dark:bg-[#1F214A] dark:border-[#1F214A] dark:text-white border-2 border-gray-200 p-4 rounded-lg ">
       
        <Dialog>
        <div className="flex items-end">
        <DialogTrigger className="bg-blue-400 rounded-md text-white p-2 m-2 justify-end flex">Add new Goal</DialogTrigger>
        </div>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create a new Goal</DialogTitle>

            </DialogHeader>
            <div>

              <form
                onSubmit={(e) => {
                  submitForm(e)
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
                    htmlFor="money"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    How much ammount you want to invest monthly for this goal
                  </label>
                  <input
                    type="string"
                    id="investment"
                    name="investment"
                    step="0.01"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter the target amount"
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

        <LinearProgressBar
 text="Goals"
 percentage={20}
 textStyle={{
   color: 'black',
   fontSize: '1rem',
   fontStyle: 'italic'
 }}
/>
      </div>
    </div>
  );
};

export default Comp2;