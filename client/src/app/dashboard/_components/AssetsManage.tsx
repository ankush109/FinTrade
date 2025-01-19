"use client";
import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { LinearProgressBar } from "react-percentage-bar";
import { createAsset } from "../../../api/goals/index";
import Lottie from 'react-lottie-player'


import lottieJson from "../../../assets/finance.json"
import toast from "react-hot-toast";
import AssetData from "./assets";
const Assets: React.FC = () => {
  const submitForm = async(e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const assetdata = {
      name: formData.get("name"),
      ammount: formData.get("investment"),
      type: formData.get("type"),
    };
    console.log(assetdata);
    const res = await createAsset(assetdata)
    if(res.status==200){
        toast.success("assets create successfuly!")
    }
  };

  return (
    <div className="">
      <div className="bg-white dark:bg-[#1F214A] dark:border-[#1F214A] dark:text-white border-2 border-gray-200 p-6 rounded-lg shadow-md">
        <Dialog>
        
            <DialogTrigger  className="bg-blue-600  rounded-md text-white p-2 m-2 justify-end flex">
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
   style={{ width: 300, height: 300 }} // Reduced the width and height
 />
      </div>
   <div>
            <AssetData/>
        </div>
</div>
        </div>
        
      </div>
 
  );
};

export default Assets;
