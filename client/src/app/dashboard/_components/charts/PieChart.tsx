import { useGetUserExpenseQuery } from "@/api/query/useGetUserExpenses";
import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#8dd1e1",
  "#d0ed57",
];

const CategoryPieChart: React.FC = () => {
  const {
    data: expenses,
    isLoading,
    isError,
    error,
    isSuccess,
    refetch,
  } = useGetUserExpenseQuery();
  const [selectedMonth, setSelectedMonth] = useState("2025-05");
  if (isLoading) {
    return <div>Loading...</div>;
  }
  console.log("Expenses:", expenses);
  const filteredExpenses = expenses.message.filter((e) =>
    e.date.startsWith(selectedMonth)
  );
  console.log("Filtered Expenses:", filteredExpenses);

  const categorizedTotals = filteredExpenses.reduce((acc, curr) => {
    acc[curr.category] = (acc[curr.category] || 0) + curr.price;
    return acc;
  }, {} as Record<string, number>);

  const pieChartData = Object.entries(categorizedTotals).map(
    ([category, value]) => ({
      name: category,
      value,
    })
  );

  if (filteredExpenses.length === 0) {
    return (
      <div className="bg-white p-10 rounded-lg shadow-md m-5">
        <div className="mb-4">
          <label className="font-semibold">Select Month: </label>
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => {
              setSelectedMonth(e.target.value);
              refetch();
            }}
            className="border rounded px-2 py-1"
          />
        </div>
        <h2 className="text-xl font-semibold">
          No expenses found for this month.
        </h2>
        <p>Please select a different month.</p>
      </div>
    );
  }
  return (
    <div className="bg-white p-10 rounded-lg shadow-md m-5">
      <div className="mb-4">
        <label className="font-semibold">Select Month: </label>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => {
            setSelectedMonth(e.target.value);
            refetch();
          }}
          className="border rounded px-2 py-1"
        />
      </div>

      <div style={{ display: "flex", justifyContent: "center" }}>
        <PieChart width={600} height={400}>
          <Pie
            data={pieChartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label={({ name, value }) => `${name}: ₹${value}`}
          >
            {pieChartData.map((_, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `₹${value}`} />
          <Legend />
        </PieChart>
      </div>
    </div>
  );
};

export default CategoryPieChart;
