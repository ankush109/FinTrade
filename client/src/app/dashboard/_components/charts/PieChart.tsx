import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const expenses = [
  // January
  {
    name: "groceries",
    category: "Food & Drinks",
    price: 1200,
    date: "2025-01-05",
  },
  {
    name: "bus ticket",
    category: "Transportation",
    price: 60,
    date: "2025-01-07",
  },
  {
    name: "electricity bill",
    category: "Bills & Utilities",
    price: 950,
    date: "2025-01-15",
  },

  // February
  {
    name: "valentine dinner",
    category: "Food & Drinks",
    price: 1500,
    date: "2025-02-14",
  },
  {
    name: "gift",
    category: "Gifts & Donations",
    price: 800,
    date: "2025-02-13",
  },
  {
    name: "tax fee",
    category: "Fees & Charges",
    price: 200,
    date: "2025-02-28",
  },

  // March
  { name: "new shoes", category: "Shopping", price: 3000, date: "2025-03-04" },
  { name: "medicine", category: "Health", price: 450, date: "2025-03-10" },
  {
    name: "gym subscription",
    category: "Health",
    price: 1200,
    date: "2025-03-20",
  },

  // April
  {
    name: "netflix",
    category: "Entertainment",
    price: 500,
    date: "2025-04-02",
  },
  {
    name: "beer",
    category: "Smoking & Alcohol",
    price: 350,
    date: "2025-04-09",
  },
  { name: "cab", category: "Transportation", price: 220, date: "2025-04-18" },

  // May
  { name: "tea", category: "Food & Drinks", price: 10, date: "2025-05-10" },
  { name: "momo", category: "Food & Drinks", price: 1000, date: "2025-05-10" },
  { name: "lunch", category: "Food & Drinks", price: 100, date: "2025-05-11" },
  { name: "dinner", category: "Food & Drinks", price: 400, date: "2025-05-12" },
  { name: "travel", category: "Travel", price: 120, date: "2025-05-13" },
  {
    name: "cigarette",
    category: "Smoking & Alcohol",
    price: 50,
    date: "2025-05-13",
  },
  {
    name: "go-karting",
    category: "Entertainment",
    price: 100,
    date: "2025-05-14",
  },
  {
    name: "ice cream",
    category: "Food & Drinks",
    price: 20,
    date: "2025-05-15",
  },
];

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#8dd1e1",
  "#d0ed57",
];

const CategoryPieChart: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState("2025-05");

  const filteredExpenses = expenses.filter((e) =>
    e.date.startsWith(selectedMonth)
  );

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

  return (
    <div className="bg-white p-5">
      <div className="mb-4">
        <label className="font-semibold">Select Month: </label>
        <input
          type="month"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
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
