"use client";
import React from "react";
import Expense from "./_components/Expense";

import UpperDashboardSection from "./_components/UpperDashboard";
import ChatBot from "./_components/chatbot/ChatBot";
import ExpensePieChart from "./_components/charts/PieChart";
import { useGetUserDetailsQuery } from "@/hooks/query/useGetUserDetails";
import Loader from "@/app/dashboard/bitcoin/_components/Loader";

const App: React.FC = () => {
  const { data: userData } = useGetUserDetailsQuery();

  return (
    <>
      {userData ? (
        <div>
          <div className="flex-1 max-w-7xl mx-auto bg-[#696FFB0A] dark:bg-[#545469] p-4">
            <UpperDashboardSection />
            <Expense />
            <ExpensePieChart />
          </div>
          <ChatBot />
        </div>
      ) : (
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-2xl font-bold">
            <Loader />
          </h1>
        </div>
      )}
    </>
  );
};

export default App;
