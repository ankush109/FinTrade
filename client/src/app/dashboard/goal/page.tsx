"use client";

import { Button } from "@/components/ui/button";
import { useGetUserGoalsQuery } from "@/hooks/query/useGetUserGoals";
import { ThemeProvider, useThemeProvider } from "@/providers/ThemeContext";

import React, { useEffect } from "react";
import { BsAirplane } from "react-icons/bs";
import { SlOptionsVertical } from "react-icons/sl";
import CreateGoal from "../_components/createGoal";

function Page() {
  const { isDarkMode } = useThemeProvider();
  const { data: goalsData, isLoading } = useGetUserGoalsQuery();

  if (isLoading) return <h1>loading...</h1>;

  const calculateMonthsPassed = (createdAt) => {
    const created = createdAt ? new Date(createdAt) : new Date(); // fallback to today
    const now = new Date();
    const months =
      (now.getFullYear() - created.getFullYear()) * 12 +
      (now.getMonth() - created.getMonth());
    return Math.max(1, months);
  };

  return (
    <ThemeProvider>
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
                <CreateGoal />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {goalsData?.message
                ?.filter((data) => !isNaN(parseInt(data.invest)))
                ?.map((data, idx) => {
                  const monthlyInvest = parseInt(data.invest);
                  const target = parseInt(data.money);
                  const monthsPassed = calculateMonthsPassed(data.createdAt);
                  const totalSaved = monthlyInvest * monthsPassed;
                  const progress =
                    target > 0 ? Math.min(100, (totalSaved / target) * 100) : 0;
                  const remaining = target - totalSaved;
                  const monthsRequired = Math.ceil(target / monthlyInvest);

                  return (
                    <GoalCard
                      key={idx}
                      isDarkMode={isDarkMode}
                      data={{
                        ...data,
                        invest: monthlyInvest,
                        progress,
                        remaining,
                        saved: totalSaved,
                        monthsRequired,
                      }}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default Page;

const GoalCard = ({ isDarkMode, data }) => {
  const { name, invest, progress, remaining, money, saved, monthsRequired } =
    data;

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
            <h1>{name}</h1>
          </div>
          <SlOptionsVertical />
        </div>
        <div className="mt-3">₹ {invest} / month</div>
        <ProgressBar progress={progress} isDarkMode={isDarkMode} />
        <div className="flex justify-between">
          <div className="flex gap-2">
            <h1>₹ {saved}</h1> <div className="text-gray-500">saved so far</div>
          </div>
          <div>{Math.round(progress)}%</div>
        </div>
        <hr
          className={`${isDarkMode ? "border-gray-700" : "border-gray-200"}`}
        />
        <div className="flex justify-between">
          <div className="text-gray-500">Target :</div>
          <div>₹ {money}</div>
        </div>
        <div className="flex justify-between">
          <div className="text-gray-500">Remaining :</div>
          <div>₹ {remaining > 0 ? remaining : 0}</div>
        </div>
        <div className="text-gray-500 text-sm mt-2">
          Goal will complete in ~{monthsRequired} months
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
