import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const currentMonthIndex = new Date().getMonth(); // e.g., May = 4

const data = Array.from({ length: currentMonthIndex + 1 }, (_, i) => ({
  name: months[i],
  uv: Math.floor(2000 + Math.random() * 2000),
  pv: Math.floor(3000 + Math.random() * 3000),
  amt: Math.floor(1500 + Math.random() * 2500),
}));

const MonthlyAreaChart = () => {
  return (
    <AreaChart
      data={data}
      width={620}
      height={250}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    >
      <defs>
        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#FF5A5F" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#FF5A5F" stopOpacity={0} />
        </linearGradient>
        <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#DBDFAC" stopOpacity={0.8} />
          <stop offset="95%" stopColor="#DBDFAC" stopOpacity={0} />
        </linearGradient>
      </defs>
      <XAxis dataKey="name" />
      <YAxis />
      <CartesianGrid strokeDasharray="3 3" />
      <Tooltip />
      <Area
        type="monotone"
        dataKey="uv"
        stroke="#8884d8"
        fillOpacity={1}
        fill="url(#colorUv)"
      />
      <Area
        type="monotone"
        dataKey="pv"
        stroke="#82ca9d"
        fillOpacity={1}
        fill="url(#colorPv)"
      />
    </AreaChart>
  );
};

export default MonthlyAreaChart;
