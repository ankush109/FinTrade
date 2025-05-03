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
            <UpperDashboardSection />
            <Expense />
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
