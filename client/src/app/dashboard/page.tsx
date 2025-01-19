"use client"
import React from "react";
import Sidebar from "./_components/sidebar";
import Navbar from "../Navbar";
import Comp1 from "./_components/comp1";
import Comp2 from "./_components/comp2";
import Comp3 from "./_components/comp3";
import Goal from "./_components/Goal";
import Assets from "./_components/AssetsManage";
import Expense from "./_components/Expense";
import { GetUserQuery } from "../../api/user/index";

const App: React.FC = () => {
  const user = GetUserQuery();
  const isSidebarExpanded = true;

  return (
   <>
   {user?.data ? ( 
     <div className="flex font-sans">
     {/* Sidebar */}
     <Sidebar />

     {/* Main Content */}
     <main
       className={`flex flex-col flex-1 transition-all duration-300 ${
         isSidebarExpanded ? "pl-44" : "pl-16"
       }`}
     >
       {/* <Navbar /> */}
       <div className="flex-1 max-w-7xl mx-auto bg-[#696FFB0A] dark:bg-[#545469] p-4">
         <div className="mb-6">
           <h1
             className="text-4xl ml-4 font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 animate-fade-in scale-in-center"
           >
             {user?.data?.name.toUpperCase() + "'s Dashboard"}
           </h1>
         </div>
         <Comp1 />
         <Assets />
         <Expense />
         <Comp2 />
         <Goal />
         <Comp3 />
       </div>
     </main>
   </div>
   ):(
    <div>
      <h1 className="ml-20 mt-20 text-3xl">Loading your Dashboard in a while ...</h1>
    </div>
   )}
   </>
  );
};

export default App;
