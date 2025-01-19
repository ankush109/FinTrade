"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createAsset, getmyassets } from "../../../api/goals/index";
import Lottie from "react-lottie-player";
import lottieJson from "../../../assets/finance.json";
import toast from "react-hot-toast";
import AssetData from "./assets";

const Assets: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { refetch } = getmyassets();

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const assetData = {
      name: formData.get("name"),
      ammount: formData.get("investment"),
      type: formData.get("type"),
    };

    try {
      const res = await createAsset(assetData);
      if (res.success) {
        toast.success("Asset created successfully!");
        refetch();
        setIsDialogOpen(false); // Close the dialog on success
      } else {
        throw new Error("Failed to create asset");
        setIsDialogOpen(false);
      }
    } catch (error) {
      console.error("Error creating asset:", error);
      toast.error("Failed to create asset. Please try again.");
    }
  };

  return (
    <div className="">
      <div className="bg-white dark:bg-[#1F214A] dark:border-[#1F214A] dark:text-white border-2 border-gray-200 p-6 rounded-lg shadow-md">
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger className="bg-blue-600 rounded-md text-white p-2 m-2 justify-end flex">
            Create a new asset
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold text-gray-700 dark:text-white">
                Create New Asset
              </DialogTitle>
              <DialogDescription className="text-sm text-gray-500 dark:text-gray-400">
                Fill out the details below to create a new financial goal.
              </DialogDescription>
            </DialogHeader>
            <form
              onSubmit={(e) => {
                submitForm(e);
              }}
              className="mt-4 space-y-4"
            >
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Asset Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-[#1F214A] dark:border-gray-600 dark:text-white"
                  placeholder="Enter your goal (e.g., Car, Vacation)"
                />
              </div>

              <div>
                <label
                  htmlFor="investment"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Target Amount
                </label>
                <input
                  type="text"
                  id="investment"
                  name="investment"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-[#1F214A] dark:border-gray-600 dark:text-white"
                  placeholder="Enter the target amount"
                />
              </div>

              <div>
                <label
                  htmlFor="type"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                >
                  Investment Type
                </label>
                <select
                  id="type"
                  name="type"
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-[#1F214A] dark:border-gray-600 dark:text-white"
                >
                  <option value="" disabled selected>
                    Select investment type
                  </option>
                  <option value="FD">Fixed Deposit</option>
                  <option value="Mutual Funds">Mutual Funds</option>
                  <option value="Stocks">Stocks</option>
                </select>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                  Create Asset
                </button>
              </div>
            </form>
          </DialogContent>
        </Dialog>

        <div className="flex">
          <div>
            <Lottie
              loop
              animationData={lottieJson}
              play
              style={{ width: 300, height: 300 }}
            />
          </div>
          <div>
            <AssetData />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assets;
