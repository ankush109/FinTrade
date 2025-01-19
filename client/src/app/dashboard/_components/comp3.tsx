"use client"
import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
} from "chart.js";

import { useTheme } from "../../../context/ThemeContext";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale
);

const IntegrationTableRow: React.FC<{
  icon: string;
  name: string;
  type: string;
  rate: number;
  profit: string;
  hasBorder?: boolean;
}> = ({ icon, name, type, rate, profit, hasBorder = true }) => {
  return (
    <tr
      className={`${
        hasBorder
          ? " border-b-2 border-[#00000029] dark:border-[#FFFFFF29] "
          : ""
      }
   
    `}
    >
      <td className=" py-6 px-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="mr-3 align-middle"
            style={{
              width: "15px",
              height: "15px",
            }}
          />
          <div className="flex items-center">
            <img
              src={icon}
              className="h-6 w-6 mr-2 border-2 border-[#00000029] dark:border-[#FFFFFF29]"
            />
            <div className="text-sm">{name}</div>
          </div>
        </div>
      </td>
      <td className=" px-4 py-6 text-sm">{type}</td>

      <td className="px-4 py-6 ">
        <div className="w-40 h-2  rounded flex  items-center">
          {/* <div className={`w-[100%] h-2 bg-green-500 rounded`}></div> */}
          <div
            style={{
              width: `${rate}%`,
              backgroundColor: "#696FFB",
              borderRadius: "4px",
            }}
            className="h-1.5"
          ></div>
          <div
            style={{
              width: `${100 - rate}%`,
              backgroundColor: "#696FFB33",
              borderRadius: "4px",
            }}
            className="h-1.5"
          ></div>
          <span className="text-xs ml-4">{rate}%</span>
        </div>
      </td>

      <td className=" text-sm px-4 py-6">{profit}</td>
    </tr>
  );
};

const Comp3: React.FC = () => {
  const { isDarkMode } = useTheme();
  const data = {
    labels: ["Premium User", "Basic User"],
    datasets: [
      {
        data: [66, 33],
        backgroundColor: ["#696FFB", "#696FFB99"],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    cutout: "70%",
    rotation: -90,
    circumference: 180,
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          boxWidth: 5,
          boxHeight: 30,
          color: isDarkMode ? "#FFFFFF99" : "#00000099",
        },
      },
    },
  };

  return (
    <div className="grid grid-cols-12 gap-6 mx-2">
      {/* Registered Users */}
      <div className="bg-white dark:bg-[#1F214A] dark:border-[#1F214A] dark:text-white border-2 border-gray-200 p-4 rounded-lg col-span-12 md:col-span-5 lg:col-span-4">
        <h2 className="text-xl font-bold mb-4">Registered Users</h2>
        <div className="flex h-[230px] justify-center items-center">
          <Doughnut data={data} options={options} />
        </div>
      </div>

      {/* Sales Integration */}
      <div className="bg-white dark:bg-[#1F214A] dark:border-[#1F214A] dark:text-white border-2 border-gray-200 p-4 rounded-lg col-span-12 md:col-span-7 lg:col-span-8">
        <h2 className="text-xl font-bold mb-6">List of Integration</h2>
        <table className="min-w-full table-auto  text-[#00000099] dark:text-[#FFFFFF99] ">
          <thead className="">
            <tr className="bg-[#696FFB14] dark:bg-[#FFFFFF14]">
              <th className="px-4 py-2 text-left text-sm first:rounded-l-lg ">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-3 align-middle"
                    style={{
                      width: "15px",
                      height: "15px",
                    }}
                  />
                  <span>Application</span>
                </div>
              </th>
              <th className="px-4 py-2 text-left text-sm ">Type</th>
              <th className="px-4 py-2 text-left text-sm ">Rate</th>
              <th className="px-4 py-2 text-left text-sm  last:rounded-r-lg">
                Profit
              </th>
            </tr>
          </thead>

          <tbody>
            {/* <IntegrationTableRow
              icon={Stripe}
              name="Stripe"
              type="Finance"
              rate={33}
              profit="$10,998.28"
            />
            <IntegrationTableRow
              icon={Zapier}
              name="Zapier"
              type="CRM"
              rate={27}
              profit="$8,998.59"
            />
            <IntegrationTableRow
              icon={Shopify}
              name="Shopify"
              type="Marketplace"
              rate={40}
              profit="$13,331.24"
              hasBorder={false}
            /> */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Comp3;