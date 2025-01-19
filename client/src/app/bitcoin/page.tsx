"use client";
import React, { useState } from "react";
import Chart from "../../components1/Chart";
import Price from "../../components1/Price";
import Summary from "../../components1/Summary";
import Statistics from "../../components1/Statistics";
import Analysis from "../../components1/Analysis";
import Settings from "../../components1//Settings";

function Page() {
  const tabs = [
    { label: "Summary", component: <Summary /> },
    { label: "Chart", component: <Chart /> },
    { label: "Statistics", component: <Statistics /> },
    { label: "Analysis", component: <Analysis /> },
    { label: "Settings", component: <Settings /> },
  ];

  const [selectedTab, setSelectedTab] = useState<number>(1);

  return (
    <div className="mt-16 ml-16">
      {/* <Full /> */}
      {/* Price section */}
      <Price />
      {/* Tabs */}
      <section>
        <div className="grid grid-cols-12">
          {tabs.map((tab, index) => (
            <div
              key={index}
              className={`flex justify-center relative text-[#6F7177] text-[18px] leading-[22.77px] font-normal hover:text-[#1A243A] cursor-pointer ${
                selectedTab === index ? "text-[#1A243A]" : ""
              }`}
              onClick={() => setSelectedTab(index)}
            >
              {tab.label}
              {selectedTab === index && (
                <span className="absolute left-0 -bottom-6 w-full h-[3px] bg-[#4B40EE] opacity-100 transition-opacity"></span>
              )}
            </div>
          ))}
        </div>
        <hr className="border-t-2 border-gray-200 mt-6" />
      </section>
      {/* Tabs */}
      <section className="mt-12">{tabs[selectedTab].component}</section>
      {/* {tabs[selectedTab].component} */}
    </div>
  );
}

export default Page;
