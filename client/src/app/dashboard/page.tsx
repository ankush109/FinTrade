import React from "react";
import Sidebar from "./_components/sidebar";
import Navbar from "../Navbar";
import Comp1 from "./_components/comp1";
import Comp2 from "./_components/comp2";
import Comp3 from "./_components/comp3";
import Goal from "./_components/Goal";

const App: React.FC = () => {
  const isSidebarExpanded = true
  return (
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
        <div className="flex-1 bg-[#696FFB0A] dark:bg-[#545469] p-4">
         
          <Comp1 />
         
          <Comp2 />
          <Goal/>
          <Comp3 />
        </div>
      </main>
    </div>
  );
};

export default App;
