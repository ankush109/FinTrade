"use client";
import React from "react";
import Expense from "./_components/Expense";
import { GetUserQuery } from "../../api/user/index";
import UpperDashboardSection from "./_components/UpperDashboard";
import GoalDashboardSection from "./_components/GoalDashboardSection";
import GoalTracker from "./_components/GoalTracker";

const App: React.FC = () => {
  const user = GetUserQuery();

  return (
    <>
      {user?.data ? (
        <div>
          <div className="flex-1 max-w-7xl mx-auto bg-[#696FFB0A] dark:bg-[#545469] p-4">
            <div className="mb-6">
              <h1 className="text-4xl ml-4 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 animate-fade-in scale-in-center">
                {user?.data?.name.toUpperCase() + "'s Dashboard"}
              </h1>
            </div>
            <UpperDashboardSection />
            <Expense />
            {/* <GoalDashboardSection />
            <GoalTracker /> */}
          </div>
        </div>
      ) : (
        <div>
          <h1 className="ml-20 mt-20 text-3xl">
            Loading your Dashboard in a while ...
          </h1>
        </div>
      )}
    </>
  );
};

export default App;
