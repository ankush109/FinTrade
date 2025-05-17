"use client";
import React, { useEffect } from "react";
import StatCard from "./statecard";

import RenderLineChart from "./charts/LineChart";
import MonthlyAreaChart from "./charts/AreaChart";
import { useGetUserFinanceQuery } from "@/hooks/query/useGetUserFinanceQuery";
import { useGetUserDetailsQuery } from "@/hooks/query/useGetUserDetails";

const UpperDashboardSection: React.FC = () => {
  const { data } = useGetUserFinanceQuery();
  const { data: userdata } = useGetUserDetailsQuery();
  useEffect(() => {
    console.log(userdata.inflow, "userdata");
  }, [userdata]);
  const monthName = new Date().toLocaleString("default", { month: "long" });
  return (
    <div className="grid grid-cols-12 gap-6 mt-6 pb-6 mx-3">
      <StatCard
        title="Monthly Income"
        value={data?.message?.monthlyIncome}
        change="12.27%"
        isPositive={true}
        comparisonText="Compared to last month"
        not={false}
      />
      <StatCard
        not={false}
        title="Total Savings"
        value={data?.message?.totalSaving}
        change="12.27%"
        isPositive={true}
        comparisonText="Compared to last month"
      />
      <StatCard
        title={`${monthName}'s Savings`}
        value={`${userdata?.inflow - userdata?.outflow}`}
        change="2.63%"
        isPositive={false}
        not={false}
        comparisonText="Compared to last month"
      />
      <StatCard
        title={`${monthName}'s Expenses`}
        value={userdata?.outflow}
        change="2.63%"
        isPositive={false}
        not={false}
        comparisonText="Compared to last month"
      />
      {/* <StatCard
        title="Number of Loans's"
        not={true}
        value={data?.message?.numberofloans}
        change="8.75%"
        isPositive={true}
        comparisonText="Compared to last month"
      /> */}
      <div className="flex flex-row bg-white border border-gray-300 rounded-lg p-5 col-span-12 gap-6  items-center justify-center">
        <RenderLineChart />
        <MonthlyAreaChart />
      </div>
    </div>
  );
};

export default UpperDashboardSection;
