"use client"
import React from "react";
import StatCard from "./statecard";
import { getMyfinance } from "@/api/finance";

const Comp1: React.FC = () => {


  const { data } = getMyfinance()
  return (
    <div className="grid grid-cols-12 gap-6 mt-6 pb-6 mx-3">
      <StatCard
        title="Monthly Income"
        value={data?.message?.monthlyIncome}
        change="12.27%"
        isPositive={true}
        comparisonText="Compared to last month"
      />
       <StatCard
        title="Total Savings"
        value={data?.message?.totalSaving}
        change="12.27%"
        isPositive={true}
        comparisonText="Compared to last month"
      />
      <StatCard
        title="Yearly Income"
        value={
          data?.message?.monthlyIncome
            ? (parseFloat(data?.message?.monthlyIncome) * 12).toFixed(2)
            : "N/A"
        }
        change="2.63%"
        isPositive={false}
        comparisonText="Compared to last month"
      />

      
      <StatCard
        title="Number of Loans's"
        not={true}
        value={data?.message?.numberofloans}
        change="8.75%"
        isPositive={true}
        comparisonText="Compared to last month"
      />
    </div>
  );
};

export default Comp1;