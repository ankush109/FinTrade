import React from "react";
import { useStockData } from "../hooks/useStockData";
import {
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import Loader from "./Loader";
interface StockDataPoint {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  quoteVolume: number;
  numTrades: number;
  takerBuyBaseVolume: number;
  takerBuyQuoteVolume: number;
}

const Analysis: React.FC = () => {
  const { data: stockData = [], isLoading } = useStockData("1d");

  const calculateRSI = (data: number[], period: number = 14) => {
    let gains = 0;
    let losses = 0;

    for (let i = 1; i <= period; i++) {
      const change = data[i] - data[i - 1];
      if (change > 0) gains += change;
      else losses -= change;
    }

    const avgGain = gains / period;
    const avgLoss = losses / period;
    const rs = avgGain / avgLoss;

    return 100 - 100 / (1 + rs);
  };

  const closePrices = stockData.map((item: StockDataPoint) => item.close);
  const rsi = calculateRSI(closePrices, 14);

  const movingAvg50 =
    closePrices.slice(0, 50).reduce((acc: any, curr: any) => acc + curr, 0) /
    50;
  const movingAvg200 =
    closePrices.slice(0, 200).reduce((acc: any, curr: any) => acc + curr, 0) /
    200;

  const totalVolume = stockData.reduce(
    (acc: any, curr: any) => acc + curr.volume,
    0
  );
  const averagePrice =
    stockData.reduce((acc: any, curr: any) => acc + curr.close, 0) /
    stockData.length;

  const totalTrades = stockData.reduce(
    (acc: any, curr: any) => acc + curr.numTrades,
    0
  );
  const holdingsData = [
    { name: "Retail Investors", value: 35 },
    { name: "Institutional Investors", value: 45 },
    { name: "Crypto Funds", value: 10 },
    { name: "Governments", value: 5 },
    { name: "Exchanges", value: 5 },
  ];
  const sentimentData = [
    { name: "Bullish", value: 50 },
    { name: "Neutral", value: 30 },
    { name: "Bearish", value: 20 },
  ];

  const HOLDINGS_COLORS = [
    "#FFBB28", // Retail Investors
    "#FF8042", // Institutional Investors
    "#00C49F", // Crypto Funds
    "#4B40EE", // Governments
    "#8884d8", // Exchanges
  ];
  const SENTIMENT_COLORS = ["#04cf48", "#e8a70e", "#c91a0a"];
  if (isLoading) {
    return (
      <div className="flex flex-row justify-center m-4">
        <Loader />
      </div>
    );
  }
  return (
    <div>
      <div className=" px-8 pb-4 ">
        <div className="flex flex-row justify-between flex-wrap ">
          <div className=" w-[380px] h-fit rounded-lg shadow-md">
            <div className="px-6 py-6 flex flex-col justify-center ">
              <div className="flex flex-row justify-between pt-4 border-b-2 border-gray-200">
                <div className="text-gray-400">RSI (14)</div>
                <div className="text-2xl text-gray-800 ">{rsi.toFixed(2)}</div>
              </div>
              <div className="flex flex-row justify-between pt-4 border-b-2 border-gray-200">
                <div className="text-gray-400">50 EMA</div>
                <div className="text-2xl text-gray-800">
                  {movingAvg50.toFixed(2)}
                </div>
              </div>
              <div className="flex flex-row justify-between pt-4 border-b-2 border-gray-200">
                <div className="text-gray-400">200 EMA</div>
                <div className="text-2xl text-gray-800">
                  {movingAvg200.toFixed(2)}
                </div>
              </div>
              <div className="flex flex-row justify-between pt-4 border-b-2 border-gray-200">
                <div className="text-gray-400"> Volume</div>
                <div className="text-2xl text-gray-800">
                  {totalVolume.toLocaleString()}
                </div>
              </div>
              <div className="flex flex-row justify-between pt-4 border-b-2 border-gray-200">
                <div className="text-gray-400">Average Price</div>
                <div className="text-2xl text-gray-800">
                  {averagePrice.toFixed(2)}
                </div>
              </div>
              <div className="flex flex-row justify-between pt-4 border-b-2 border-gray-200">
                <div className="text-gray-400">Total Trades</div>
                <div className="text-2xl text-gray-800">
                  {totalTrades.toLocaleString()}
                </div>
              </div>
            </div>
          </div>
          <div className=" w-[380px] h-[430px] rounded-lg shadow-lg">
            <div className="flex flex-col align-middle ">
              <div className="flex flex-row justify-center my-3">
                Holdings Distribution
              </div>
              <div className=" flex flex-row  pl-[40px] h-[350px] w-[350px]">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={holdingsData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      fill="#FFBB28"
                      paddingAngle={3}
                      label
                    >
                      {holdingsData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={HOLDINGS_COLORS[index % HOLDINGS_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
          <div className=" w-[380px] h-[430px] rounded-lg shadow-lg">
            <div className="flex flex-col align-middle ">
              <div className="flex flex-row justify-center mt-3 ">
                Market Sentiment
              </div>
              <div className=" flex flex-row  pl-[40px] h-[350px] w-[350px] mt-[-15px]">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={sentimentData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      fill="#4B40EE"
                      paddingAngle={3}
                      label
                    >
                      {sentimentData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            SENTIMENT_COLORS[index % SENTIMENT_COLORS.length]
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analysis;
