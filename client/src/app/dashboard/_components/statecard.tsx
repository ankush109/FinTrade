import React from "react";

interface StatCardProps {
  title: string;
  value: string;
  change: string;
  not: boolean;
  isPositive: boolean;
  comparisonText: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  not,
  isPositive,
  comparisonText,
}) => {
  const bgColor = isPositive
    ? "bg-[#B8E9D4] dark:bg-[#2CC483]"
    : "bg-[#FDD5DA] dark:bg-[#FF5E75]";
  const arrow = isPositive ? "↑" : "↓";

  return (
    <div className="bg-white dark:bg-[#1F214A] dark:text-white border-2 border-gray-200 dark:border-[#1F214A] p-4 rounded-lg col-span-12 md:col-span-6 lg:col-span-3">
      <h2 className="text-md font-bold pb-2">{title}</h2>
      <p className="text-3xl font-bold pb-4">
        {" "}
        {!not ? "₹" : ""}
        {value}
      </p>
      <div className="flex flex-row items-center justify-center">
        <div
          className={`py-[1px] px-2 w-[85px] ${bgColor} rounded-md text-sm font-normal`}
        >
          {arrow} {change}
        </div>
        <div className="text-sm mx-2 text-gray-500">{comparisonText}</div>
      </div>
    </div>
  );
};

export default StatCard;
