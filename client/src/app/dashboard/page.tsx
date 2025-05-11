"use client";
import React from "react";
import Expense from "./_components/Expense";

import UpperDashboardSection from "./_components/UpperDashboard";
import ChatBot from "./_components/chatbot/ChatBot";
import ExpensePieChart from "./_components/charts/PieChart";
import { GetUserQuery } from "@/hooks/query/useGetUserDetails";
import Loader from "@/components1/Loader";

const App: React.FC = () => {
  const user = GetUserQuery();
  const [chats, setChats] = React.useState([
    {
      title: "Chat 1",
      message: "Hello! How can I help you today?",
    },
    {
      title: "Chat 2",
      message: "I have a question about my account.",
    },
    {
      title: "Chat 3",
      message: "Can you assist me with my recent transaction?",
    },
  ]);
  const [loading, setLoading] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <>
      {user?.data ? (
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
