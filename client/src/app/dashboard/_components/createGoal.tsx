"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

// Replace with your own mutation hook
import { useCreateGoalMutation } from "@/hooks/mutation/useCreateGoalMutation";

const CreateGoal: React.FC = () => {
  const { mutate: createGoal } = useCreateGoalMutation();
  const [creating, setCreating] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCreating(true);

    const formData = new FormData(e.currentTarget);
    const goal = {
      name: formData.get("name") as string,
      money: parseFloat(formData.get("money") as string),
      type: formData.get("type") as string,
      investment: formData.get("investment") as string,
    };

    createGoal(goal, {
      onSuccess: () => {
        toast.success("Goal created successfully!");
        setDialogOpen(false);
      },
      onError: () => {
        toast.error("Failed to create goal.");
      },
      onSettled: () => {
        setCreating(false);
      },
    });
  };

  return (
    <div className="p-5">
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogTrigger asChild>
          <button
            onClick={() => setDialogOpen(true)}
            className="px-3 py-1 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
          >
            {creating ? "Creating..." : "Create a Goal"}
          </button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">
              Create Financial Goal
            </DialogTitle>
            <DialogDescription>
              Set your goal name, type, and how you plan to invest.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 mt-4">
            <InputField
              label="Goal Name"
              name="name"
              type="text"
              placeholder="e.g. Vacation"
            />
            <InputField
              label="Target Amount"
              name="money"
              type="number"
              step="0.01"
              placeholder="e.g. 10000"
            />
            <InputField
              label="Type"
              name="type"
              type="text"
              placeholder="e.g. Short Term / Long Term"
            />
            <InputField
              label="Investment Method"
              name="investment"
              type="text"
              placeholder="e.g. Stocks"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-6 py-2 bg-green-600 text-white rounded-lg shadow-md hover:bg-green-700 transition"
              >
                {creating ? "Creating..." : "Create Goal"}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const InputField = ({
  label,
  name,
  type,
  placeholder,
  step,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  step?: string;
}) => (
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

export default CreateGoal;
