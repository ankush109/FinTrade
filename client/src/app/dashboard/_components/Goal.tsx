"use client";

import React, { useEffect } from "react";
import { getmygoals } from "../../../api/goals/index";

function Goal() {
  const { data } = getmygoals();

  useEffect(() => {
    console.log(data?.message, "data");
  }, [data]);

  return (
    <div className="mt-5 mb-5 bg-white p-5 rounded-md border-2 border-gray-200  rounded-lg shadow-md">
      <h1 className="text-2xl font-bold text-gray-700 dark:text-white mb-6 ">
        My Goals
      </h1>

      {data?.message?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {data?.message.map((goal) => (
            <GoalCard key={goal.id} goal={goal} />
          ))}
        </div>
      ) : (
        <p className="text-center text-lg text-gray-600 dark:text-gray-300">
          No goals found. Start by creating your first goal!
        </p>
      )}
    </div>
  );
}

export default Goal;

const GoalCard = ({ goal }) => {
  return (
    <div className="bg-white dark:bg-[#1F214A] border border-gray-200 dark:border-[#1F214A] rounded-lg shadow-lg p-6 transition-transform hover:scale-105">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
          {goal.name}
        </h3>
        <span
          className={`text-sm font-medium px-2 py-1 rounded ${
            goal.type === "LONG_TERM"
              ? "bg-blue-100 text-blue-600"
              : "bg-green-100 text-green-600"
          }`}
        >
          {goal.type === "LONG_TERM" ? "Long Term" : "Short Term"}
        </span>
      </div>

      {/* Goal Amount */}
      <p className="text-2xl font-bold text-gray-800 dark:text-blue-500 mb-4">
        ₹{goal.money.toLocaleString()}
      </p>

      {/* Created Date */}
      <div className="flex justify-end">
        <span className="text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded">
          {new Date(goal.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>
    </div>
  );
};
