"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import React from "react";
import { BsAirplane } from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";

function Page() {
  const { isDarkMode } = useTheme();

  return (
    <div
      className={`min-h-screen ${
        isDarkMode ? "bg-black text-white" : "bg-gray-200 text-black"
      }`}
    >
      <div className="p-10">
        <div
          className={`border-2 p-2 rounded-lg ${
            isDarkMode ? "border-gray-700" : "border-gray-300"
          }`}
        >
          <div
            className={`flex justify-between p-2 rounded-lg items-center border-b-2 mb-5 ${
              isDarkMode ? "border-gray-700" : "border-gray-300 bg-white"
            }`}
          >
            <div>
              <h1 className="font-medium">Available Balance</h1>
              <h1 className="font-bold">₹ 60,000</h1>
            </div>
            <div>
              <Button>Set Now</Button>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {Array(8)
              .fill(0)
              .map((_, idx) => (
                <GoalCard key={idx} isDarkMode={isDarkMode} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

const GoalCard = ({ isDarkMode }) => {
  return (
    <div
      className={`w-[350px] rounded-lg font-sans font-semibold min-h-[250px] border-2 ${
        isDarkMode
          ? "bg-zinc-900 border-gray-700 text-white"
          : "bg-white border-gray-200 text-black"
      }`}
    >
      <div className="p-2 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <BsAirplane />
            <h1>Vacation</h1>
          </div>
          <SlOptionsVertical />
        </div>
        <div className="mt-3">₹ 1,000</div>
        <ProgressBar progress={20} isDarkMode={isDarkMode} />
        <div className="flex justify-between">
          <div className="flex gap-2">
            <h1>₹ 1,450</h1> <div className="text-gray-500">saved so far</div>
          </div>
          <div>20%</div>
        </div>
        <hr
          className={`${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
        />
        <div className="flex justify-between">
          <div className="text-gray-500">Target :</div>
          <div>₹ 10,000</div>
        </div>
        <div className="flex justify-between">
          <div className="text-gray-500">Remaining :</div>
          <div>₹ 9,000</div>
        </div>
      </div>
      <div
        className={`${
          isDarkMode ? "bg-gray-800" : "bg-stone-300"
        } h-12 flex items-center pl-2 rounded-lg`}
      >
        Auto save
      </div>
    </div>
  );
};

const ProgressBar = ({ progress, isDarkMode }) => {
  return (
    <div
      className={`w-full h-1 rounded-full overflow-hidden ${
        isDarkMode ? "bg-gray-700" : "bg-gray-200"
      }`}
    >
      <div
        className="h-full bg-blue-500 transition-all duration-300"
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};
