"use client";
import React from "react";
import Expense from "./_components/Expense";

import UpperDashboardSection from "./_components/UpperDashboard";
import ChatBot from "./_components/chatbot/ChatBot";
import ExpensePieChart from "./_components/charts/PieChart";
import { GetUserQuery } from "@/api/query/useGetUserDetails";

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
