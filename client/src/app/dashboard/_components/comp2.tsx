"use client"
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line, Radar } from "react-chartjs-2";
import { useTheme } from "../../../context/ThemeContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  RadialLinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const LineChart: React.FC<{ data: any; options: any; plugins?: any[] }> = ({
  data,
  options,
  plugins = [],
}) => (
  <div className="flex h-[230px] justify-center items-center">
    <Line data={data} options={options} plugins={plugins} />
  </div>
);

const RadarChart: React.FC<{ data: any; options: any }> = ({
  data,
  options,
}) => (
  <div className="flex h-[230px] justify-center items-center">
    <Radar data={data} options={options} />
  </div>
);

const Comp2: React.FC = () => {
  const { isDarkMode } = useTheme();

  const commonTextColor = isDarkMode ? "#FFFFFF99" : "#00000099";
  const commonGridColor = isDarkMode ? "#2f2f38" : "#dcdce8";

  const lineChartData = {
    labels: [
      "Jan 2024",
      "Feb 2024",
      "Mar 2024",
      "Apr 2024",
      "May 2024",
      "Jun 2024",
      "Jul 2024",
      "Aug 2024",
      "Sep 2024",
      "Oct 2024",
      "Nov 2024",
      "Dec 2024",
    ],
    datasets: [
      {
        label: "Total Revenue",
        data: [40, 50, 60, 45, 70, 55, 75, 65, 80, 60, 85, 70],
        borderColor: "#696FFB",
        backgroundColor: "#696FFB",
        borderWidth: 2,
        pointRadius: 4,
        tension: 0,
      },
      {
        label: "Total Target",
        data: [45, 55, 50, 50, 75, 60, 70, 80, 75, 65, 90, 60],
        borderColor: "#FF9E2B",
        backgroundColor: "#FF9E2B",
        borderWidth: 2,
        pointRadius: 4,
        tension: 0,
      },
    ],
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: commonTextColor,
          boxWidth: 6,
          boxHeight: 6,
          usePointStyle: true,
        },
      },
    },
    layout: {
      padding: {
        top: 10,
        bottom: 10,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Months",
          color: commonTextColor,
        },
        ticks: {
          color: commonTextColor,
        },
      },
      y: {
        title: {
          display: true,
          text: "Revenue ($K)",
          color: commonTextColor,
        },
        ticks: {
          stepSize: 10,
          color: commonTextColor,
        },
      },
    },
  };

  const chartAreaBackground = {
    id: "chartAreaBackground",
    beforeDraw: (chart: any) => {
      const {
        ctx,
        chartArea: { left, right, top, bottom },
      } = chart;
      ctx.save();
      ctx.fillStyle = "#696FFB0A";
      ctx.fillRect(left, top, right - left, bottom - top);
      ctx.restore();
    },
  };

  const radarChartData = {
    labels: ["Asia", "Europe", "Americas", "Africa", "Middle East", "Pacific"],
    datasets: [
      {
        label: "Sales by Region",
        data: [65, 59, 80, 81, 56, 55],
        backgroundColor: "#64A2FF52",
        borderColor: "#696FFB",
        borderWidth: 2,
        pointRadius: 3,
      },
    ],
  };

  const radarChartOptions = {
    plugins: {
      legend: {
        position: "top" as const,
        display: false,
      },
    },
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        beginAtZero: true,
        ticks: {
          display: false,
          stepSize: 20,
        },
        pointLabels: {
          color: commonTextColor,
        },
        grid: {
          color: commonGridColor,
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-12 gap-6 mx-2 pb-6">
      <div className="bg-white dark:bg-[#1F214A] dark:border-[#1F214A] dark:text-white border-2 border-gray-200 p-4 rounded-lg col-span-12 md:col-span-7 lg:col-span-8">
        <h2 className="text-xl font-bold mb-4">Total Revenue vs Target</h2>
        <LineChart
          data={lineChartData}
          options={lineChartOptions}
          plugins={[chartAreaBackground]}
        />
      </div>
      <div className="bg-white dark:bg-[#1F214A] dark:border-[#1F214A] dark:text-white border-2 border-gray-200 p-4 rounded-lg col-span-12 md:col-span-5 lg:col-span-4">
        <h2 className="text-xl font-bold mb-4">Sales by Region</h2>
        <RadarChart data={radarChartData} options={radarChartOptions} />
      </div>
    </div>
  );
};

export default Comp2;